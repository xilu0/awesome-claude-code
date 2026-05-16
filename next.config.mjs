import nextra from 'nextra'

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.jsx'
})

export default withNextra({
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    unoptimized: true
  },
  async redirects() {
    return [
      // Claude Code root pages
      { source: '/getting-started/introduction',  destination: '/getting-started/claude-code/introduction',  permanent: true },
      { source: '/getting-started/get-api-key',   destination: '/getting-started/claude-code/get-api-key',   permanent: true },
      { source: '/getting-started/pricing',        destination: '/getting-started/claude-code/pricing',        permanent: true },
      { source: '/getting-started/quick-start',   destination: '/getting-started/claude-code/quick-start',   permanent: true },
      // Claude Code installation
      { source: '/getting-started/installation',                      destination: '/getting-started/claude-code/installation',                      permanent: true },
      { source: '/getting-started/installation/windows',              destination: '/getting-started/claude-code/installation/windows',              permanent: true },
      { source: '/getting-started/installation/macos',                destination: '/getting-started/claude-code/installation/macos',                permanent: true },
      { source: '/getting-started/installation/linux',                destination: '/getting-started/claude-code/installation/linux',                permanent: true },
      { source: '/getting-started/installation/ccswitch',             destination: '/getting-started/claude-code/installation/ccswitch',             permanent: true },
      { source: '/getting-started/installation/diagnose',             destination: '/getting-started/claude-code/installation/diagnose',             permanent: true },
      { source: '/getting-started/installation/diagnose/macos',       destination: '/getting-started/claude-code/installation/diagnose/macos',       permanent: true },
      { source: '/getting-started/installation/diagnose/windows',     destination: '/getting-started/claude-code/installation/diagnose/windows',     permanent: true },
      { source: '/getting-started/installation/diagnose/terminal-basics', destination: '/getting-started/claude-code/installation/diagnose/terminal-basics', permanent: true },
      // Claude Code how-to (wildcard)
      { source: '/getting-started/how-to',         destination: '/getting-started/claude-code/how-to',        permanent: true },
      { source: '/getting-started/how-to/:path*',  destination: '/getting-started/claude-code/how-to/:path*', permanent: true },
      // Claude Code FAQ — 6 kept in faq, 3 moved to common-errors
      { source: '/getting-started/faq',                                 destination: '/getting-started/claude-code/faq',                                 permanent: true },
      { source: '/getting-started/faq/basics',                          destination: '/getting-started/claude-code/faq/basics',                          permanent: true },
      { source: '/getting-started/faq/config-baseurl-authtoken',        destination: '/getting-started/claude-code/faq/config-baseurl-authtoken',        permanent: true },
      { source: '/getting-started/faq/use-in-ide',                      destination: '/getting-started/claude-code/faq/use-in-ide',                      permanent: true },
      { source: '/getting-started/faq/connect-openai-model',   destination: '/getting-started/claude-code/installation/connect-openai-model',   permanent: true },
      { source: '/getting-started/faq/claude-desktop-gateway', destination: '/getting-started/claude-code/installation/claude-desktop-gateway', permanent: true },
      { source: '/getting-started/claude-code/faq/connect-openai-model',   destination: '/getting-started/claude-code/installation/connect-openai-model',   permanent: true },
      { source: '/getting-started/claude-code/faq/claude-desktop-gateway', destination: '/getting-started/claude-code/installation/claude-desktop-gateway', permanent: true },
      { source: '/getting-started/faq/fetch-websearch-alternatives',    destination: '/getting-started/claude-code/faq/fetch-websearch-alternatives',    permanent: true },
      { source: '/getting-started/faq/high-token-consumption',          destination: '/getting-started/claude-code/common-errors/high-token-consumption', permanent: true },
      { source: '/getting-started/faq/slow-response',                   destination: '/getting-started/claude-code/common-errors/slow-response',          permanent: true },
      { source: '/getting-started/faq/network-diagnosis',               destination: '/getting-started/claude-code/common-errors/network-diagnosis',      permanent: true },
      // Claude Code common-errors
      { source: '/getting-started/common-errors',                                    destination: '/getting-started/claude-code/common-errors',                                    permanent: true },
      { source: '/getting-started/common-errors/error-400-context-management',       destination: '/getting-started/claude-code/common-errors/error-400-context-management',       permanent: true },
      { source: '/getting-started/common-errors/error-400-invalid-signature-thinking', destination: '/getting-started/claude-code/common-errors/error-400-invalid-signature-thinking', permanent: true },
      { source: '/getting-started/common-errors/syntax-error-node-version',          destination: '/getting-started/claude-code/common-errors/syntax-error-node-version',          permanent: true },
      { source: '/getting-started/common-errors/get-session-file',                   destination: '/getting-started/claude-code/common-errors/get-session-file',                   permanent: true },
      // Codex
      { source: '/getting-started/codex-installation', destination: '/getting-started/codex/installation', permanent: true },
      { source: '/getting-started/codex-ccswitch',     destination: '/getting-started/codex/ccswitch',     permanent: true },
      { source: '/getting-started/codex-desktop',      destination: '/getting-started/codex/desktop',      permanent: true },
      { source: '/getting-started/codex-bootstrap-error', destination: '/getting-started/codex/bootstrap-error', permanent: true },
      // Gemini
      { source: '/getting-started/gemini-introduction',   destination: '/getting-started/gemini/introduction',   permanent: true },
      { source: '/getting-started/gemini-installation',   destination: '/getting-started/gemini/installation',   permanent: true },
      { source: '/getting-started/gemini-quick-start',    destination: '/getting-started/gemini/quick-start',    permanent: true },
      { source: '/getting-started/gemini-faq',            destination: '/getting-started/gemini/faq',            permanent: true },
      { source: '/getting-started/gemini-common-errors',  destination: '/getting-started/gemini/common-errors',  permanent: true },
      // OpenCode
      { source: '/getting-started/opencode-introduction', destination: '/getting-started/opencode/introduction', permanent: true },
      { source: '/getting-started/opencode-installation', destination: '/getting-started/opencode/installation', permanent: true },
      // OpenClaw
      { source: '/getting-started/clawdbot-introduction', destination: '/getting-started/openclaw/introduction', permanent: true },
      { source: '/getting-started/clawdbot-installation', destination: '/getting-started/openclaw/installation', permanent: true },
    ]
  },
})
