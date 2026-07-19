import { describe, expect, test } from 'bun:test'

import {
  renderApplicationSharedEmail,
  renderApplicationStartedEmail,
  renderMagicLinkEmail,
} from '../src'

describe('email renderers', () => {
  test('renders a magic-link message', async () => {
    const message = await renderMagicLinkEmail({
      url: 'https://vaster.app/auth/magic-link?token=test',
      productName: 'Vaster',
      email: 'person@example.com',
    })

    expect(message.subject).toBe('Your Vaster sign-in link')
    expect(message.html).toContain('Sign in to Vaster')
    expect(message.text).toContain('person@example.com')
  })

  test('renders an application-shared message', async () => {
    const message = await renderApplicationSharedEmail({
      appLink: 'https://vaster.app/apply/test',
      owner: { name: 'Alex Morgan', email: 'alex@vaster.com' },
    })

    expect(message.subject).toBe('Vaster Private Application Link')
    expect(message.html).toContain('Your loan application is ready')
    expect(message.text).toContain('alex@vaster.com')
  })

  test('renders an application-started message', async () => {
    const message = await renderApplicationStartedEmail({
      uuid: 'application-123',
      appLink: 'https://vaster.app/apply/application-123',
      loanPurpose: 'purchase',
      loanAmount: 850000,
      loanOfficer: { name: 'Alex Morgan', email: 'alex@vaster.com', role: 'lo' },
      inviteFromIp: '203.0.113.42',
      inviteFromLocation: { city: 'Miami', country: 'United States' },
    })

    expect(message.subject).toContain('New Application Started')
    expect(message.html).toContain('$850,000')
    expect(message.text).toContain('Miami, United States')
  })
})
