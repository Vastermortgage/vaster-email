import {
  EmailAction,
  EmailDetails,
  EmailEyebrow,
  EmailHeading,
  EmailLinkFallback,
  EmailParagraph,
  InfoCallout,
} from '../components/email-content'
import { NotificationLayout } from '../components/notification-layout'

export interface InvitationEmailProps {
  productName: string
  organizationName?: string
  recipientName?: string
  inviterName?: string
  role?: string
  invitationUrl: string
  expiresAt?: string
}

export function InvitationEmail({
  productName,
  organizationName,
  recipientName,
  inviterName,
  role,
  invitationUrl,
  expiresAt,
}: InvitationEmailProps) {
  const destination = organizationName ? `${organizationName} on ${productName}` : productName

  return (
    <NotificationLayout preview={`You have been invited to join ${destination}`}>
      <EmailEyebrow>Invitation</EmailEyebrow>
      <EmailHeading>You&apos;re invited to {destination}</EmailHeading>
      {recipientName && <EmailParagraph>Hi {recipientName},</EmailParagraph>}
      <EmailParagraph>
        {inviterName ? <strong>{inviterName}</strong> : 'A Vaster administrator'} invited you to join{' '}
        <strong>{destination}</strong>.
      </EmailParagraph>
      <EmailDetails items={role ? [{ label: 'Role', value: role }] : []} />
      <EmailAction href={invitationUrl}>Accept invitation</EmailAction>
      <EmailLinkFallback href={invitationUrl} />
      {expiresAt && (
        <InfoCallout>This invitation expires {expiresAt}.</InfoCallout>
      )}
    </NotificationLayout>
  )
}

InvitationEmail.PreviewProps = {
  productName: 'Vaster Expenses',
  organizationName: 'Vaster Capital',
  recipientName: 'Jordan Lee',
  inviterName: 'Alex Morgan',
  role: 'Approver',
  invitationUrl: 'https://expenses.vaster.app/invitations/accept?id=sample-invitation',
  expiresAt: 'July 25, 2026',
} satisfies InvitationEmailProps

export default InvitationEmail
