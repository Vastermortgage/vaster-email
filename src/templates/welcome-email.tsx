import { Link } from 'react-email'

import {
  EmailAction,
  EmailEyebrow,
  EmailHeading,
  EmailLinkFallback,
  EmailParagraph,
} from '../components/email-content'
import { NotificationLayout } from '../components/notification-layout'

export interface WelcomeEmailProps {
  productName: string
  recipientName?: string
  message: string
  actionUrl: string
  actionLabel?: string
  supportEmail?: string
}

export function WelcomeEmail({
  productName,
  recipientName,
  message,
  actionUrl,
  actionLabel = `Open ${productName}`,
  supportEmail,
}: WelcomeEmailProps) {
  return (
    <NotificationLayout preview={`Welcome to ${productName}`}>
      <EmailEyebrow>Welcome</EmailEyebrow>
      <EmailHeading>Welcome to {productName}</EmailHeading>
      {recipientName && <EmailParagraph>Hi {recipientName},</EmailParagraph>}
      <EmailParagraph>{message}</EmailParagraph>
      <EmailAction href={actionUrl}>{actionLabel}</EmailAction>
      <EmailLinkFallback href={actionUrl} />
      {supportEmail && (
        <EmailParagraph>
          Need help? Contact us at{' '}
          <Link href={`mailto:${supportEmail}`} className="text-[#002F87] no-underline">
            {supportEmail}
          </Link>
          .
        </EmailParagraph>
      )}
    </NotificationLayout>
  )
}

WelcomeEmail.PreviewProps = {
  productName: 'Vaster Docs',
  recipientName: 'Jordan Lee',
  message: 'Your workspace is ready. You can now upload documents, organize files, and collaborate with your team.',
  actionUrl: 'https://docs.vaster.app',
  supportEmail: 'hello@vaster.com',
} satisfies WelcomeEmailProps

export default WelcomeEmail
