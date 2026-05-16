import { useState, useEffect } from 'react'

// ─── Static fallback data ─────────────────────────────────────────────────────
// Used when the API is unreachable. Update these when the API contract changes.
const FALLBACK_TIERS = [
  { name: 'Free',  monthlyCost: 0,    timeWindowMinutes: 10080, rateLimitCost: 7,   weeklyCostLimit: 0   },
  { name: 'Pro',   monthlyCost: 169,  timeWindowMinutes: 300,   rateLimitCost: 7,   weeklyCostLimit: 45  },
  { name: 'Max',   monthlyCost: 799,  timeWindowMinutes: 300,   rateLimitCost: 35,  weeklyCostLimit: 210 },
  { name: 'Ultra', monthlyCost: 2499, timeWindowMinutes: 300,   rateLimitCost: 150, weeklyCostLimit: 750 },
]

const FALLBACK_RATES = { claude: 1, codex: 0.6, gemini: 0.6 }

// Static marketing copy — editorial content not stored in the API.
const PLAN_META = {
  Free:  { desc: '简单尝鲜',     official: '—',              privilege: '—',                   support: '社区支持'      },
  Pro:   { desc: '中度使用',     official: 'Claude Pro',     privilege: '—',                   support: '工单优先处理'  },
  Max:   { desc: '高强度使用',   official: 'Claude Max 5X',  privilege: '独享 Key & 高速通道', support: '企微快速响应'  },
  Ultra: { desc: '超高强度使用', official: 'Claude Max 20X', privilege: '独享 Key & 高速通道', support: '架构师 1 对 1' },
}

// The three model series shown in the docs and their API keys.
const MODEL_DISPLAY = [
  { key: 'claude', label: 'Anthropic Claude' },
  { key: 'codex',  label: 'OpenAI CodeX'     },
  { key: 'gemini', label: 'Google Gemini'    },
]

const TIERS_URL       = 'https://customer.claude-code.club/api/public/tiers'
const MODEL_RATES_URL = 'https://customer.claude-code.club/api/public/model-rates'

// ─── Pure helpers ─────────────────────────────────────────────────────────────

function formatWindow(tier) {
  switch (tier.timeWindowMinutes) {
    case 300:   return `${tier.rateLimitCost} USD/5 小时`
    case 10080: return `${tier.rateLimitCost} USD/周`
    default:    return `${tier.rateLimitCost} USD/${tier.timeWindowMinutes} 分钟`
  }
}

// Formula from cc-club-website buildRate():
//   monthlyUsdQuota = (weeklyCostLimit / 7) × 30
//   yuanPerUsd      = floor(monthlyCost × multiplier / monthlyUsdQuota × 100) / 100
// Returns null for Free tier (monthlyCost=0) or when inputs are zero.
function buildYuanPerUsd(tier, multiplier) {
  if (!tier.monthlyCost || !tier.weeklyCostLimit || !multiplier) return null
  const monthlyUsdQuota = (tier.weeklyCostLimit / 7) * 30
  const value = (tier.monthlyCost * multiplier) / monthlyUsdQuota
  return (Math.floor(value * 100) / 100).toFixed(2)
}

// ─── Data hook ────────────────────────────────────────────────────────────────

function usePricingData() {
  const [tiers, setTiers] = useState(FALLBACK_TIERS)
  const [rates, setRates] = useState(FALLBACK_RATES)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const ctrl = new AbortController()
    const timeout = setTimeout(() => ctrl.abort(), 5000)

    Promise.all([
      fetch(TIERS_URL, { signal: ctrl.signal })
        .then(r => { if (!r.ok) throw new Error(r.status); return r.json() })
        .then(j => { if (j.success) setTiers(j.data.tiers) }),
      fetch(MODEL_RATES_URL, { signal: ctrl.signal })
        .then(r => { if (!r.ok) throw new Error(r.status); return r.json() })
        .then(j => { if (j.success) setRates(j.data.rates) }),
    ])
      .catch(err => {
        if (err.name !== 'AbortError')
          console.warn('[PricingTable] API fetch failed, using fallback data:', err)
      })
      .finally(() => { clearTimeout(timeout); setLoading(false) })

    return () => { clearTimeout(timeout); ctrl.abort() }
  }, [])

  return { tiers, rates, loading }
}

// ─── Shared table styles ──────────────────────────────────────────────────────

const tableStyle = { width: '100%', borderCollapse: 'collapse', fontSize: '14px', lineHeight: '1.6' }
const thStyle    = { padding: '8px 12px', textAlign: 'left', fontWeight: 600, borderBottom: '2px solid var(--nextra-border, #e5e7eb)', whiteSpace: 'nowrap' }
const tdStyle    = { padding: '7px 12px', borderBottom: '1px solid var(--nextra-border, #e5e7eb)', verticalAlign: 'top' }
const tdLbl      = { ...tdStyle, fontWeight: 500, color: 'var(--nextra-colors-gray600, #6b7280)', whiteSpace: 'nowrap' }

// ─── PricingTable ─────────────────────────────────────────────────────────────

export function PricingTable() {
  const { tiers, loading } = usePricingData()
  const D = '—'

  const rows = [
    { label: '适合用户',     fn: t => PLAN_META[t.name]?.desc     ?? D },
    { label: '我们的价格',   fn: t => t.monthlyCost === 0 ? '免费' : `¥${t.monthlyCost}/月` },
    { label: '窗口限制',     fn: t => formatWindow(t) },
    { label: '每周额度',     fn: t => t.weeklyCostLimit ? `${t.weeklyCostLimit} USD/周` : D },
    { label: '可用时段',     fn: _t => '全天可用' },
    { label: '对应官方套餐', fn: t => PLAN_META[t.name]?.official ?? D },
    { label: '套餐特权',     fn: t => PLAN_META[t.name]?.privilege ?? D },
    { label: '服务支持',     fn: t => PLAN_META[t.name]?.support   ?? D },
  ]

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>项目</th>
            {tiers.map(t => <th key={t.name} style={thStyle}>{t.name}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map(row => (
            <tr key={row.label}>
              <td style={tdLbl}>{row.label}</td>
              {tiers.map(t => <td key={t.name} style={tdStyle}>{row.fn(t)}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ─── ModelRatesTable ──────────────────────────────────────────────────────────

export function ModelRatesTable() {
  const { tiers, rates, loading } = usePricingData()
  const D = '—'
  const paidTiers = tiers.filter(t => t.monthlyCost > 0)

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>模型系列</th>
            {paidTiers.map(t => <th key={t.name} style={thStyle}>{t.name}</th>)}
          </tr>
        </thead>
        <tbody>
          {MODEL_DISPLAY.map(({ key, label }) => (
            <tr key={key}>
              <td style={tdLbl}>{label}</td>
              {paidTiers.map(t => {
                const m = rates[key]
                if (m == null) return <td key={t.name} style={tdStyle}>{D}</td>
                const yuanPerUsd = buildYuanPerUsd(t, m)
                return (
                  <td key={t.name} style={tdStyle}>
                    {`${m.toFixed(1)}x，${yuanPerUsd != null ? yuanPerUsd + 'CNY/USD' : D}`}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ─── WeeklyQuotaTable ─────────────────────────────────────────────────────────

export function WeeklyQuotaTable() {
  const { tiers, loading } = usePricingData()
  const paidTiers = tiers.filter(t => t.monthlyCost > 0)

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>套餐</th>
            <th style={thStyle}>每周额度</th>
          </tr>
        </thead>
        <tbody>
          {paidTiers.map(t => (
            <tr key={t.name}>
              <td style={tdLbl}>{t.name}</td>
              <td style={tdStyle}>{`${t.weeklyCostLimit} USD/周`}</td>            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
