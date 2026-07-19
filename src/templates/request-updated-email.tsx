import {
  EmailAction,
  EmailCard,
  EmailEyebrow,
  EmailHeading,
  EmailLinkFallback,
  EmailParagraph,
} from '../components/email-content'
import { NotificationLayout } from '../components/notification-layout'

export interface RequestUpdatedEmailProps {
  requestTitle: string
  recipientName?: string
  updatedByName: string
  updateLabel: string
  updateSummary: string
  requestUrl: string
}

export function RequestUpdatedEmail({
  requestTitle,
  recipientName,
  updatedByName,
  updateLabel,
  updateSummary,
  requestUrl,
}: RequestUpdatedEmailProps) {
  return (
    <NotificationLayout preview={`${updatedByName} updated ${requestTitle}`}>
      <EmailEyebrow>Request updated</EmailEyebrow>
      <EmailHeading>{requestTitle} was updated</EmailHeading>
      {recipientName && <EmailParagraph>Hi {recipientName},</EmailParagraph>}
      <EmailParagraph>
        <strong>{updatedByName}</strong> updated this request.
      </EmailParagraph>
      <EmailCard>
        <EmailParagraph>
          <strong>{updateLabel}</strong>
        </EmailParagraph>
        <EmailParagraph>{updateSummary}</EmailParagraph>
      </EmailCard>
      <EmailAction href={requestUrl}>View request</EmailAction>
      <EmailLinkFallback href={requestUrl} />
    </NotificationLayout>
  )
}

RequestUpdatedEmail.PreviewProps = {
  requestTitle: 'Client travel reimbursement',
  recipientName: 'Alex Morgan',
  updatedByName: 'Jordan Lee',
  updateLabel: 'Updated description',
  updateSummary: 'Travel expenses for the client closing and site visit in Miami.',
  requestUrl: 'https://expenses.vaster.app/admin/expense-requests/sample-request',
} satisfies RequestUpdatedEmailProps

export default RequestUpdatedEmail
