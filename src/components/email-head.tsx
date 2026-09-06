import { Head } from 'react-email'

// Keep these hooks separate from Tailwind utilities: React Email inlines the
// light palette, while email clients need retained classes for dark overrides.
const darkStyles: Record<string, string> = {
  'email-page': 'background-color: #101827 !important;',
  'email-surface': 'background-color: #182233 !important;',
  'email-card': 'background-color: #243247 !important;',
  'email-heading': 'color: #f5f7fb !important;',
  'email-body': 'color: #e1e7f0 !important;',
  // Body moves its inline spacing, background, and text color to this cell,
  // but leaves className on <body>. Override both surfaces after rendering.
  'email-page > table > tbody > tr > td': 'background-color: #101827 !important; color: #e1e7f0 !important;',
  'email-surface > table > tbody > tr > td': 'background-color: #182233 !important; color: #e1e7f0 !important;',
  'email-secondary': 'color: #c4cede !important;',
  'email-muted': 'color: #abb9cd !important;',
  'email-brand': 'color: #aac8ff !important;',
  'email-border': 'border-color: #46566e !important;',
  'email-button': 'background-color: #002f87 !important; color: #ffffff !important;',
  'email-on-brand': 'color: #ffffff !important;',
  'email-info': 'background-color: #1d3150 !important; border-color: #526f9c !important; color: #c5dcff !important;',
  'email-success': 'background-color: #17392d !important; border-color: #467d63 !important; color: #b6efcd !important;',
  'email-danger': 'background-color: #44252c !important; border-color: #a25f6b !important; color: #ffd0d5 !important;',
  'email-pending': 'background-color: #3b301c !important; border-color: #f59e0b !important;',
  'email-pending-text': 'color: #f9d58b !important;',
}

const rules = (prefix = '') =>
  Object.entries(darkStyles)
    .map(([selector, declarations]) => {
      const rule = `${prefix}.${selector} { ${declarations} }`
      // Outlook may mark the email root itself instead of an ancestor.
      return prefix ? `${rule}\n${prefix.trim()}.${selector} { ${declarations} }` : rule
    })
    .join('\n')

export function EmailHead() {
  return (
    <Head>
      <meta name="color-scheme" content="light dark" />
      <meta name="supported-color-schemes" content="light dark" />
      <style>{`
        :root { color-scheme: light dark; supported-color-schemes: light dark; }
        @media (prefers-color-scheme: dark) { ${rules()} }
        ${rules('[data-ogsc] ')}
        ${rules('[data-ogsb] ')}
      `}</style>
    </Head>
  )
}
