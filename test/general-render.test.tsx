import { describe, expect, test } from 'bun:test'

import {
  renderApprovalRequestEmail,
  renderCommentNotificationEmail,
  renderFeedbackReceivedEmail,
  renderInvitationEmail,
  renderProcessingCompletedEmail,
  renderProcessingFailedEmail,
  renderRequestApprovedEmail,
  renderRequestCompletedEmail,
  renderRequestRejectedEmail,
  renderRequestUpdatedEmail,
  renderWelcomeEmail,
  renderWorkflowHandoffEmail,
} from '../src'

describe('general-purpose email renderers', () => {
  test('renders an invitation', async () => {
    const message = await renderInvitationEmail({
      productName: 'Vaster Docs',
      organizationName: 'Vaster Capital',
      recipientName: 'Jordan Lee',
      role: 'Admin',
      invitationUrl: 'https://docs.vaster.app/invitations/test',
    })

    expect(message.subject).toBe('Join Vaster Capital on Vaster Docs')
    expect(message.text).toContain('Accept invitation')
  })

  test('renders a welcome message', async () => {
    const message = await renderWelcomeEmail({
      productName: 'Vaster Docs',
      recipientName: 'Jordan Lee',
      message: 'Your workspace is ready.',
      actionUrl: 'https://docs.vaster.app',
    })

    expect(message.subject).toBe('Welcome to Vaster Docs')
    expect(message.html).toContain('Your workspace is ready.')
  })

  test('renders an approval request and sanitizes its subject', async () => {
    const message = await renderApprovalRequestEmail({
      requestTitle: 'Travel reimbursement\r\nBcc: attacker@example.com',
      requesterName: 'Jordan Lee',
      details: [{ label: 'Amount', value: '$1,842.60 USD' }],
      reviewUrl: 'https://expenses.vaster.app/requests/test',
    })

    expect(message.subject).toBe('Action required: Travel reimbursement Bcc: attacker@example.com')
    expect(message.subject).not.toContain('\n')
    expect(message.text).toContain('$1,842.60 USD')
  })

  test('renders a comment notification', async () => {
    const message = await renderCommentNotificationEmail({
      requestTitle: 'Travel reimbursement',
      authorName: 'Alex Morgan',
      comment: 'Please add the project code.',
      requestUrl: 'https://expenses.vaster.app/requests/test',
    })

    expect(message.subject).toBe('New comment on Travel reimbursement')
    expect(message.text).toContain('Please add the project code.')
  })

  test('renders a request update', async () => {
    const message = await renderRequestUpdatedEmail({
      requestTitle: 'Travel reimbursement',
      updatedByName: 'Jordan Lee',
      updateLabel: 'Updated description',
      updateSummary: 'Added the client project code.',
      requestUrl: 'https://expenses.vaster.app/requests/test',
    })

    expect(message.subject).toBe('Travel reimbursement was updated')
    expect(message.text).toContain('Added the client project code.')
  })

  test('renders explicit request outcomes', async () => {
    const props = {
      requestTitle: 'Travel reimbursement',
      recipientName: 'Jordan Lee',
      actorName: 'Alex Morgan',
      amountLabel: '$1,842.60 USD',
      requestUrl: 'https://expenses.vaster.app/requests/test',
    }
    const [approved, rejected, completed] = await Promise.all([
      renderRequestApprovedEmail(props),
      renderRequestRejectedEmail({ ...props, notes: 'An itemized receipt is required.' }),
      renderRequestCompletedEmail(props),
    ])

    expect(approved.text).toContain('has been approved')
    expect(rejected.text).toContain('An itemized receipt is required.')
    expect(completed.text).toContain('No further action is required')
  })

  test('renders a workflow handoff', async () => {
    const message = await renderWorkflowHandoffEmail({
      itemTitle: 'Travel reimbursement',
      completedStep: 'manager approval',
      nextStep: 'finance processing',
      actorName: 'Alex Morgan',
      actionUrl: 'https://expenses.vaster.app/requests/test',
    })

    expect(message.subject).toBe('Travel reimbursement is ready for finance processing')
    expect(message.text).toContain('manager approval')
  })

  test('renders processing outcomes', async () => {
    const completed = await renderProcessingCompletedEmail({
      productName: 'Vaster Docs',
      itemName: 'Operating statement.pdf',
      actionUrl: 'https://docs.vaster.app/documents/test',
    })
    const failed = await renderProcessingFailedEmail({
      productName: 'Vaster Docs',
      itemName: 'Locked statement.pdf',
      errorMessage: 'The document is password protected.',
      supportEmail: 'hello@vaster.com',
    })

    expect(completed.subject).toBe('Operating statement.pdf is ready')
    expect(failed.text).toContain('password protected')
  })

  test('renders an internal feedback report', async () => {
    const message = await renderFeedbackReceivedEmail({
      appName: 'Vaster Agent',
      reportId: 'feedback-123',
      category: 'Incorrect result',
      severity: 'High',
      message: 'The second guarantor was omitted.',
      reporterEmail: 'jordan@vaster.com',
    })

    expect(message.subject).toBe('[Vaster feedback] High/Incorrect result in Vaster Agent')
    expect(message.text).toContain('feedback-123')
    expect(message.text).toContain('The second guarantor was omitted.')
  })
})
