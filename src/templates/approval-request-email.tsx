import {
  EmailAction,
  EmailDetails,
  EmailEyebrow,
  EmailHeading,
  EmailLinkFallback,
  EmailParagraph,
} from '../components/email-content'
import { NotificationLayout } from '../components/notification-layout'
import type { EmailDetail } from '../types'

export interface ApprovalRequestEmailProps {
  requestTitle: string
  requestType?: string
  requesterName: string
  summary?: string
  details?: EmailDetail[]
  reviewUrl: string
  actionLabel?: string
}

export function ApprovalRequestEmail({
  requestTitle,
  requestType,
  requesterName,
  summary,
  details = [],
  reviewUrl,
  actionLabel = 'Review request',
}: ApprovalRequestEmailProps) {
  return (
    <NotificationLayout preview={`${requestTitle} is awaiting your review`}>
      <EmailEyebrow>Action required</EmailEyebrow>
      <EmailHeading>{requestTitle} is awaiting review</EmailHeading>
      <EmailParagraph>
        <strong>{requesterName}</strong> submitted {requestType ? `a ${requestType}` : 'a request'} that needs your
        attention.
      </EmailParagraph>
      {summary && <EmailParagraph>{summary}</EmailParagraph>}
      <EmailDetails items={details} />
      <EmailAction href={reviewUrl}>{actionLabel}</EmailAction>
      <EmailLinkFallback href={reviewUrl} />
    </NotificationLayout>
  )
}

ApprovalRequestEmail.PreviewProps = {
  requestTitle: 'Client travel reimbursement',
  requestType: 'reimbursement',
  requesterName: 'Jordan Lee',
  summary: 'Travel expenses for the client closing in Miami.',
  details: [
    { label: 'Amount', value: '$1,842.60 USD' },
    { label: 'Merchant', value: 'American Airlines' },
    { label: 'Submitted', value: 'July 18, 2026' },
  ],
  reviewUrl: 'https://expenses.vaster.app/admin/expense-requests/sample-request',
} satisfies ApprovalRequestEmailProps

export default ApprovalRequestEmail
