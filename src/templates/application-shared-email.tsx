import { Button, Heading, Hr, Link, Section, Text } from 'react-email'

import { NotificationLayout } from '../components/notification-layout'

export interface ApplicationSharedEmailProps {
  appLink: string
  owner: {
    email: string
    name: string
  }
}

export function ApplicationSharedEmail(props: ApplicationSharedEmailProps) {
  return (
    <NotificationLayout
      preview={`${props.owner.name} shared a Private Loan Application with you.`}
    >
      <Heading className="mt-0 mb-[20px] p-0 text-left text-[28px] leading-[34px] font-bold email-heading text-black">
        Your loan application is ready
      </Heading>

      <Text className="mt-0 mb-[20px] text-[15px] leading-[24px] email-body text-[#1f2937]">
        <strong>{props.owner.name}</strong> has shared a Private Loan Application with you. Open it
        below to review the details and continue where they left off.
      </Text>

      <Section className="my-[24px] rounded-[12px] email-card bg-[#f5f5f7] px-[24px] py-[28px] text-center">
        <Button
          className="rounded-[8px] email-button bg-[#002F87] px-[28px] py-[14px] text-center text-[14px] font-semibold email-on-brand text-white no-underline"
          href={props.appLink}
        >
          Open application
        </Button>
      </Section>

      <Text className="mt-0 mb-[16px] text-[13px] leading-[22px] email-secondary text-[#4b5563]">
        Or copy and paste this URL into your browser:
      </Text>
      <Link
        href={props.appLink}
        className="block text-[13px] leading-[20px] break-all email-brand text-[#002F87] no-underline"
      >
        {props.appLink}
      </Link>

      <Hr className="mx-0 my-[28px] w-full border border-solid email-border border-[#e5e7eb]" />

      <Text className="m-0 text-[14px] leading-[22px] email-body text-[#1f2937]">
        Have a question? Reach out to <strong>{props.owner.name}</strong> directly at{' '}
        <Link href={`mailto:${props.owner.email}`} className="email-brand text-[#002F87] no-underline">
          {props.owner.email}
        </Link>
        .
      </Text>
    </NotificationLayout>
  )
}

ApplicationSharedEmail.PreviewProps = {
  appLink: 'https://vaster.app/apply/sample-uuid-123/transaction-terms?access=sample_token',
  owner: {
    email: 'owner@vaster.com',
    name: 'Alex Morgan',
  },
} satisfies ApplicationSharedEmailProps

export default ApplicationSharedEmail
