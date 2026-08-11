import {
  EmailAction,
  EmailDetails,
  EmailEyebrow,
  EmailHeading,
  EmailLinkFallback,
  EmailParagraph,
  SuccessCallout,
} from '../components/email-content'
import { InternalNotificationLayout } from '../components/internal-notification-layout'
import type { EmailDetail } from '../types'

export interface ProcessingCompletedEmailProps {
  productName: string
  itemName: string
  recipientName?: string
  summary?: string
  details?: EmailDetail[]
  actionUrl: string
  actionLabel?: string
}

export function ProcessingCompletedEmail({
  productName,
  itemName,
  recipientName,
  summary,
  details = [],
  actionUrl,
  actionLabel = 'View results',
}: ProcessingCompletedEmailProps) {
  return (
    <InternalNotificationLayout preview={`${itemName} is ready in ${productName}`}>
      <EmailEyebrow>Processing complete</EmailEyebrow>
      <EmailHeading>{itemName} is ready</EmailHeading>
      <SuccessCallout>Processing completed successfully.</SuccessCallout>
      {recipientName && <EmailParagraph>Hi {recipientName},</EmailParagraph>}
      <EmailParagraph>{summary ?? `${productName} finished processing ${itemName}.`}</EmailParagraph>
      <EmailDetails items={details} />
      <EmailAction href={actionUrl}>{actionLabel}</EmailAction>
      <EmailLinkFallback href={actionUrl} />
    </InternalNotificationLayout>
  )
}

ProcessingCompletedEmail.PreviewProps = {
  productName: 'Vaster Docs',
  itemName: 'July operating statement.pdf',
  recipientName: 'Jordan Lee',
  summary: 'Your document has been organized and is ready for review.',
  details: [
    { label: 'Pages', value: '24' },
    { label: 'Document type', value: 'Operating statement' },
  ],
  actionUrl: 'https://docs.vaster.app/documents/sample-document',
} satisfies ProcessingCompletedEmailProps

export default ProcessingCompletedEmail
