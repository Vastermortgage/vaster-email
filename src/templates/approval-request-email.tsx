import {
  EmailAction,
  EmailDetails,
  EmailHeading,
  EmailLinkFallback,
  EmailParagraph,
  PendingCallout,
} from '../components/email-content'
import { InternalNotificationLayout } from '../components/internal-notification-layout'
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
  actionLabel,
}: ApprovalRequestEmailProps) {
  const isExpense = requestType?.toLowerCase().includes('expense') ?? false
  const resolvedActionLabel = actionLabel ?? (isExpense ? 'Review expense' : 'Review request')

  return (
    <InternalNotificationLayout preview={`${requestTitle} is awaiting your review`}>
      <PendingCallout>{isExpense ? 'Pending expense approval' : 'Pending approval'}</PendingCallout>
      <EmailHeading>
        {isExpense ? 'Expense submission needs your review' : `${requestTitle} needs your review`}
      </EmailHeading>
      {isExpense ? (
        <EmailParagraph>
          <strong>{requesterName}</strong> submitted <strong>{requestTitle}</strong>.
        </EmailParagraph>
      ) : (
        <EmailParagraph>
          <strong>{requesterName}</strong> submitted {requestType ? `a ${requestType}` : 'a request'}.
        </EmailParagraph>
      )}
      {summary && <EmailParagraph>{summary}</EmailParagraph>}
      <EmailDetails items={details} />
      <EmailAction href={reviewUrl}>{resolvedActionLabel}</EmailAction>
      <EmailLinkFallback href={reviewUrl} />
    </InternalNotificationLayout>
  )
}

ApprovalRequestEmail.PreviewProps = {
  requestTitle: 'Client travel reimbursement',
  requestType: 'reimbursement expense',
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
