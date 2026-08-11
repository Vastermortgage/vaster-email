import { DangerCallout, EmailEyebrow } from '../components/email-content'
import { InternalNotificationLayout } from '../components/internal-notification-layout'
import { RequestDecisionContent } from '../components/request-decision-content'
import type { RequestDecisionEmailProps } from '../types'

export type RequestRejectedEmailProps = RequestDecisionEmailProps

export function RequestRejectedEmail(props: RequestRejectedEmailProps) {
  return (
    <InternalNotificationLayout preview={`${props.requestTitle} was not approved`}>
      <EmailEyebrow>Not approved</EmailEyebrow>
      <RequestDecisionContent
        {...props}
        heading={`${props.requestTitle} was not approved`}
        summary={`${props.actorName} reviewed your request and did not approve it. Review the details below and contact your team if you have questions.`}
      >
        <DangerCallout>Your request was not approved.</DangerCallout>
      </RequestDecisionContent>
    </InternalNotificationLayout>
  )
}

RequestRejectedEmail.PreviewProps = {
  requestTitle: 'Client travel reimbursement',
  recipientName: 'Jordan Lee',
  actorName: 'Alex Morgan',
  amountLabel: '$1,842.60 USD',
  notes: 'Please add an itemized hotel receipt and resubmit.',
  requestUrl: 'https://expenses.vaster.app/requests/sample-request',
} satisfies RequestRejectedEmailProps

export default RequestRejectedEmail
