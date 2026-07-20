import { readFile } from 'node:fs/promises'

import { describe, expect, test } from 'bun:test'

describe('published package build', () => {
  test('uses the production JSX runtime', async () => {
    const bundle = await readFile(new URL('../dist/index.js', import.meta.url), 'utf8')

    expect(bundle).toContain('react/jsx-runtime')
    expect(bundle).not.toContain('react/jsx-dev-runtime')
    expect(bundle).not.toContain('jsxDEV')
  })

  test('renders an invitation through the built package', async () => {
    const { renderInvitationEmail } = await import('../dist/index.js')

    const email = await renderInvitationEmail({
      productName: 'Vaster Agent',
      organizationName: 'Vaster',
      recipientName: 'Person',
      inviterName: 'Admin User',
      role: 'Member',
      invitationUrl: 'https://agent.vaster.com/sign-in',
    })

    expect(email.subject).toBe('Join Vaster on Vaster Agent')
    expect(email.html).toContain('https://agent.vaster.com/sign-in')
    expect(email.text).toContain('Admin User invited you to join Vaster on Vaster Agent.')
  })
})
