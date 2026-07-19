import { EmailEyebrow, InfoCallout } from '../components/email-content'
import { NotificationLayout } from '../components/notification-layout'
import { RequestDecisionContent } from '../components/request-decision-content'
import type { RequestDecisionEmailProps } from '../types'

export type RequestCompletedEmailProps = RequestDecisionEmailProps

export function RequestCompletedEmail(props: RequestCompletedEmailProps) {
  return (
    <NotificationLayout preview={`${props.requestTitle} was completed`}>
      <EmailEyebrow>Completed</EmailEyebrow>
      <RequestDecisionContent
        {...props}
        heading={`${props.requestTitle} was completed`}
        summary={`${props.actorName} marked your request as completed. No further action is required.`}
      >
        <InfoCallout>Your request is complete.</InfoCallout>
      </RequestDecisionContent>
    </NotificationLayout>
  )
}

RequestCompletedEmail.PreviewProps = {
  requestTitle: 'Client travel reimbursement',
  recipientName: 'Jordan Lee',
  actorName: 'Taylor Smith',
  amountLabel: '$1,842.60 USD',
  notes: 'Payment was included in the July 18 reimbursement batch.',
  requestUrl: 'https://expenses.vaster.app/requests/sample-request',
} satisfies RequestCompletedEmailProps

export default RequestCompletedEmail
