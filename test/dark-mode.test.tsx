import { describe, expect, test } from 'bun:test'

import { renderApplicationStartedEmail, renderMagicLinkEmail } from '../src'

const application = () => renderApplicationStartedEmail({
  uuid: 'dark-mode-preview',
  loanPurpose: 'purchase',
  loanAmount: 550000,
  loanOfficer: { name: 'Alex Morgan', email: 'alex@example.com' },
})

const branded = () => renderMagicLinkEmail({
  url: 'https://example.com/sign-in',
  productName: 'Vaster',
  email: 'alex@example.com',
})

describe('rendered dark-mode email styles', () => {
  test('both layouts override the Body wrapper cell as well as the body', async () => {
    for (const [render, surface] of [[application, 'surface'], [branded, 'page']] as const) {
      const { html, text } = await render()
      expect(html).toContain('name="color-scheme" content="light dark"')
      expect(html).toContain('@media (prefers-color-scheme: dark)')
      // React Email moves Body's inline background to a generated cell. A
      // body-only override leaves that cell white under the pale dark text.
      expect(html).toMatch(new RegExp(`<body class="email-${surface} email-body"`))
      for (const prefix of ['', '[data-ogsc] ', '[data-ogsb] ']) {
        expect(html).toContain(`${prefix}.email-${surface} > table > tbody > tr > td { background-color:`)
        expect(html).toContain(`${prefix.trim()}.email-${surface} > table > tbody > tr > td { background-color:`)
      }
      expect(text).not.toContain('!important')
    }
  })

  test('loan labels, amount, and action retain dark hooks alongside inline light colors', async () => {
    const { html } = await application()
    expect(html).toMatch(/<p class="email-muted"[^>]*color:rgb\(107,114,128\)[^>]*>Requested loan amount/)
    expect(html).toMatch(/<p class="email-brand"[^>]*>\$550,000/)
    expect(html).toMatch(/<table[^>]*class="email-card"[^>]*background-color:rgb\(245,245,247\)/)
    expect(html).toMatch(/<a class="email-button email-on-brand"[^>]*href="https:\/\/www.vaster.app\/apply\/dark-mode-preview\/transaction-terms"/)
  })

  test('both branded logos retain a light backing when the surrounding email darkens', async () => {
    const { html } = await branded()
    const logos = html.match(/<img\b[^>]*alt="Vaster"[^>]*>/g) ?? []
    expect(logos).toHaveLength(2)
    for (const logo of logos) {
      expect(logo).toContain('background-color:#eef3ff')
      expect(logo).toContain('background-image:linear-gradient(#eef3ff, #eef3ff)')
    }
  })
})
