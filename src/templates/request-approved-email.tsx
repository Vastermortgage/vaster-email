import { EmailEyebrow, SuccessCallout } from '../components/email-content'
import { InternalNotificationLayout } from '../components/internal-notification-layout'
import { RequestDecisionContent } from '../components/request-decision-content'
import type { RequestDecisionEmailProps } from '../types'

export type RequestApprovedEmailProps = RequestDecisionEmailProps

export function RequestApprovedEmail(props: RequestApprovedEmailProps) {
  return (
    <InternalNotificationLayout preview={`${props.requestTitle} was approved`}>
      <EmailEyebrow>Approved</EmailEyebrow>
      <RequestDecisionContent
        {...props}
        heading={`${props.requestTitle} was approved`}
        summary={`${props.actorName} approved your request. You will receive another update if more action is needed.`}
      >
        <SuccessCallout>Your request has been approved.</SuccessCallout>
      </RequestDecisionContent>
    </InternalNotificationLayout>
  )
}

RequestApprovedEmail.PreviewProps = {
  requestTitle: 'Client travel reimbursement',
  recipientName: 'Jordan Lee',
  actorName: 'Alex Morgan',
  amountLabel: '$1,842.60 USD',
  notes: 'Approved for the Miami client closing.',
  requestUrl: 'https://expenses.vaster.app/requests/sample-request',
} satisfies RequestApprovedEmailProps

export default RequestApprovedEmail
