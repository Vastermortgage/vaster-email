import {
  EmailAction,
  EmailCard,
  EmailDetails,
  EmailEyebrow,
  EmailHeading,
  EmailParagraph,
  InfoCallout,
} from '../components/email-content'
import { InternalNotificationLayout } from '../components/internal-notification-layout'
import type { EmailDetail } from '../types'

export interface FeedbackReceivedEmailProps {
  appName: string
  reportId: string
  category: string
  severity: string
  message: string
  route?: string
  reporterName?: string
  reporterEmail?: string
  createdAt?: string
  expected?: string
  tags?: string[]
  reportUrl?: string
}

export function FeedbackReceivedEmail({
  appName,
  reportId,
  category,
  severity,
  message,
  route,
  reporterName,
  reporterEmail,
  createdAt,
  expected,
  tags = [],
  reportUrl,
}: FeedbackReceivedEmailProps) {
  const details: EmailDetail[] = [
    { label: 'Report ID', value: reportId },
    { label: 'App', value: appName },
    { label: 'Category', value: category },
    { label: 'Severity', value: severity },
    ...(route ? [{ label: 'Route', value: route }] : []),
    ...(reporterName || reporterEmail
      ? [{ label: 'Reporter', value: [reporterName, reporterEmail].filter(Boolean).join(' · ') }]
      : []),
    ...(createdAt ? [{ label: 'Created', value: createdAt }] : []),
    ...(tags.length > 0 ? [{ label: 'Tags', value: tags.join(', ') }] : []),
  ]

  return (
    <InternalNotificationLayout preview={`${severity} ${category} feedback received in ${appName}`}>
      <EmailEyebrow>Product feedback</EmailEyebrow>
      <EmailHeading>New feedback from {appName}</EmailHeading>
      <InfoCallout>
        {severity} · {category}
      </InfoCallout>
      <EmailDetails items={details} />
      <EmailParagraph>
        <strong>Message</strong>
      </EmailParagraph>
      <EmailCard>
        <EmailParagraph>{message}</EmailParagraph>
      </EmailCard>
      {expected && (
        <>
          <EmailParagraph>
            <strong>Expected</strong>
          </EmailParagraph>
          <EmailCard>
            <EmailParagraph>{expected}</EmailParagraph>
          </EmailCard>
        </>
      )}
      {reportUrl && <EmailAction href={reportUrl}>Open feedback report</EmailAction>}
    </InternalNotificationLayout>
  )
}

FeedbackReceivedEmail.PreviewProps = {
  appName: 'Vaster Agent',
  reportId: 'feedback_01JZ8M4K2H',
  category: 'Incorrect result',
  severity: 'High',
  message: 'The underwriting summary omitted the second guarantor from the borrower analysis.',
  expected: 'Both guarantors should appear in the borrower and liquidity sections.',
  route: '/underwriting/applications/sample-application',
  reporterName: 'Jordan Lee',
  reporterEmail: 'jordan@vaster.com',
  createdAt: 'July 18, 2026 at 10:42 AM EDT',
  tags: ['underwriting', 'borrower-analysis'],
  reportUrl: 'https://agent.vaster.app/feedback/sample-report',
} satisfies FeedbackReceivedEmailProps

export default FeedbackReceivedEmail
