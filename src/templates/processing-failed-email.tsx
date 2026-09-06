import { Link } from 'react-email'

import {
  DangerCallout,
  EmailAction,
  EmailDetails,
  EmailEyebrow,
  EmailHeading,
  EmailLinkFallback,
  EmailParagraph,
} from '../components/email-content'
import { InternalNotificationLayout } from '../components/internal-notification-layout'

export interface ProcessingFailedEmailProps {
  productName: string
  itemName: string
  recipientName?: string
  errorMessage: string
  referenceId?: string
  retryUrl?: string
  supportEmail?: string
}

export function ProcessingFailedEmail({
  productName,
  itemName,
  recipientName,
  errorMessage,
  referenceId,
  retryUrl,
  supportEmail,
}: ProcessingFailedEmailProps) {
  return (
    <InternalNotificationLayout preview={`${productName} could not process ${itemName}`}>
      <EmailEyebrow>Processing failed</EmailEyebrow>
      <EmailHeading>We couldn&apos;t process {itemName}</EmailHeading>
      {recipientName && <EmailParagraph>Hi {recipientName},</EmailParagraph>}
      <DangerCallout>{errorMessage}</DangerCallout>
      <EmailDetails items={referenceId ? [{ label: 'Reference ID', value: referenceId }] : []} />
      {retryUrl && (
        <>
          <EmailAction href={retryUrl}>Try again</EmailAction>
          <EmailLinkFallback href={retryUrl} />
        </>
      )}
      {supportEmail && (
        <EmailParagraph>
          If the problem continues, contact{' '}
          <Link href={`mailto:${supportEmail}`} className="email-brand text-[#002F87] no-underline">
            {supportEmail}
          </Link>
          .
        </EmailParagraph>
      )}
    </InternalNotificationLayout>
  )
}

ProcessingFailedEmail.PreviewProps = {
  productName: 'Vaster Docs',
  itemName: 'July operating statement.pdf',
  recipientName: 'Jordan Lee',
  errorMessage: 'The document appears to be password protected. Upload an unlocked copy and try again.',
  referenceId: 'doc_01JZ8M4K2H',
  retryUrl: 'https://docs.vaster.app/documents/sample-document',
  supportEmail: 'hello@vaster.com',
} satisfies ProcessingFailedEmailProps

export default ProcessingFailedEmail
