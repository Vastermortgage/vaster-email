import { Button, Heading, Hr, Link, Row, Section, Text } from 'react-email'

import { InternalNotificationLayout } from '../components/internal-notification-layout'

export interface ApplicationStartedEmailProps {
  uuid: string
  appLink?: string
  loanPurpose: string
  loanAmount: string | number
  loanOfficer?: {
    name?: string
    email: string
    role?: 'admin' | 'lo' | 'broker'
  } | null
  inviteFromIp?: string | null
  inviteFromLocation?: {
    city?: string | null
    country?: string | null
  } | null
}

const USDollar = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

export function ApplicationStartedEmail(props: ApplicationStartedEmailProps) {
  const { uuid, appLink, loanPurpose, loanAmount, loanOfficer, inviteFromIp, inviteFromLocation } = props
  const applicationUrl = appLink ?? `https://www.vaster.app/apply/${uuid}/transaction-terms`
  const previewText = `New ${loanPurpose} application started · ${USDollar.format(Number(loanAmount))}`
  const location =
    inviteFromLocation?.city && inviteFromLocation?.country
      ? `${inviteFromLocation.city}, ${inviteFromLocation.country}`
      : null

  return (
    <InternalNotificationLayout preview={previewText}>
      <Text className="mt-0 mb-[8px] text-[12px] leading-[16px] font-semibold tracking-[0.08em] email-brand text-[#002F87] uppercase">
        New application
      </Text>

      <Heading className="mt-0 mb-[20px] p-0 text-left text-[28px] leading-[34px] font-bold email-heading text-black">
        A new {loanPurpose} application just started
      </Heading>

      <Text className="mt-0 mb-[24px] text-[15px] leading-[24px] email-body text-[#1f2937]">
        The applicant has submitted their initial transaction terms. Open it below to review and
        continue the workflow.
      </Text>

      <Section className="my-[24px] rounded-[12px] email-card bg-[#f5f5f7] px-[24px] py-[24px]">
        <Row>
          <Text className="mt-0 mb-[4px] text-[12px] leading-[16px] font-medium email-muted text-[#6b7280]">
            Requested loan amount
          </Text>
          <Text className="m-0 text-[28px] leading-[34px] font-bold email-brand text-[#002F87]">
            {USDollar.format(Number(loanAmount))}
          </Text>
        </Row>
        <Hr className="mx-0 my-[16px] w-full border border-solid email-border border-[#e5e7eb]" />
        <Row>
          <Text className="mt-0 mb-[4px] text-[12px] leading-[16px] font-medium email-muted text-[#6b7280]">
            Loan purpose
          </Text>
          <Text className="m-0 text-[15px] leading-[22px] font-semibold email-heading text-black capitalize">
            {loanPurpose}
          </Text>
        </Row>
      </Section>

      <Section className="my-[24px] text-center">
        <Button
          className="rounded-[8px] email-button bg-[#002F87] px-[28px] py-[14px] text-center text-[14px] font-semibold email-on-brand text-white no-underline"
          href={applicationUrl}
        >
          Open application
        </Button>
      </Section>

      <Text className="mt-0 mb-[16px] text-[13px] leading-[22px] email-secondary text-[#4b5563]">
        Or copy and paste this URL into your browser:
      </Text>
      <Link
        href={applicationUrl}
        className="block text-[13px] leading-[20px] break-all email-brand text-[#002F87] no-underline"
      >
        {applicationUrl}
      </Link>

      <Hr className="mx-0 my-[28px] w-full border border-solid email-border border-[#e5e7eb]" />

      <Text className="mt-0 mb-[8px] text-[12px] leading-[16px] font-semibold tracking-[0.08em] email-muted text-[#6b7280] uppercase">
        Submission details
      </Text>
      <Text className="mt-0 mb-[6px] text-[13px] leading-[20px] email-secondary text-[#4b5563]">
        Routed to <span className="font-semibold email-heading text-black">{loanOfficer?.name}</span>
      </Text>
      {inviteFromIp && (
        <Text className="mt-0 mb-[6px] text-[13px] leading-[20px] email-secondary text-[#4b5563]">
          Submitted from IP <span className="font-mono email-heading text-black">{inviteFromIp}</span>
          {location && (
            <>
              {' '}
              · <span className="email-heading text-black">{location}</span>
            </>
          )}
        </Text>
      )}
    </InternalNotificationLayout>
  )
}

ApplicationStartedEmail.PreviewProps = {
  uuid: 'sample-uuid-123',
  appLink: 'https://www.vaster.app/apply/sample-uuid-123/transaction-terms?access=sample-token',
  loanPurpose: 'purchase',
  loanAmount: '850000',
  loanOfficer: { name: 'Alex Morgan', email: 'alex@vaster.com', role: 'lo' },
  inviteFromIp: '203.0.113.42',
  inviteFromLocation: { city: 'Miami', country: 'United States' },
} satisfies ApplicationStartedEmailProps

export default ApplicationStartedEmail
