import {
  EmailAction,
  EmailCard,
  EmailEyebrow,
  EmailHeading,
  EmailLinkFallback,
  EmailParagraph,
} from '../components/email-content'
import { NotificationLayout } from '../components/notification-layout'

export interface CommentNotificationEmailProps {
  requestTitle: string
  recipientName?: string
  authorName: string
  comment: string
  requestUrl: string
}

export function CommentNotificationEmail({
  requestTitle,
  recipientName,
  authorName,
  comment,
  requestUrl,
}: CommentNotificationEmailProps) {
  return (
    <NotificationLayout preview={`${authorName} commented on ${requestTitle}`}>
      <EmailEyebrow>New comment</EmailEyebrow>
      <EmailHeading>New comment on {requestTitle}</EmailHeading>
      {recipientName && <EmailParagraph>Hi {recipientName},</EmailParagraph>}
      <EmailParagraph>
        <strong>{authorName}</strong> added a comment:
      </EmailParagraph>
      <EmailCard>
        <EmailParagraph>{comment}</EmailParagraph>
      </EmailCard>
      <EmailAction href={requestUrl}>View conversation</EmailAction>
      <EmailLinkFallback href={requestUrl} />
    </NotificationLayout>
  )
}

CommentNotificationEmail.PreviewProps = {
  requestTitle: 'Client travel reimbursement',
  recipientName: 'Jordan Lee',
  authorName: 'Alex Morgan',
  comment: 'The receipt looks good. Can you confirm the client project code before I approve this?',
  requestUrl: 'https://expenses.vaster.app/requests/sample-request',
} satisfies CommentNotificationEmailProps

export default CommentNotificationEmail
