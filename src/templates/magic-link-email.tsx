import { Button, Heading, Hr, Link, Section, Text } from 'react-email'

import { NotificationLayout } from '../components/notification-layout'

export interface MagicLinkEmailProps {
  url: string
  productName: string
  email: string
  expiresInMinutes?: number
}

export function MagicLinkEmail({ url, productName, email, expiresInMinutes = 5 }: MagicLinkEmailProps) {
  return (
    <NotificationLayout preview={`Your secure sign-in link for ${productName}`}>
      <Heading className="mt-0 mb-[20px] p-0 text-left text-[28px] leading-[34px] font-bold text-black">
        Sign in to {productName}
      </Heading>

      <Text className="mt-0 mb-[20px] text-[15px] leading-[24px] text-[#1f2937]">
        Use the button below to securely sign in to your Vaster account for <strong>{email}</strong>.
        This link expires in {expiresInMinutes} minutes.
      </Text>

      <Section className="my-[24px] rounded-[12px] bg-[#f5f5f7] px-[24px] py-[28px] text-center">
        <Button
          className="rounded-[8px] bg-[#002F87] px-[28px] py-[14px] text-center text-[14px] font-semibold text-white no-underline"
          href={url}
        >
          Sign in to Vaster
        </Button>
      </Section>

      <Text className="mt-0 mb-[16px] text-[13px] leading-[22px] text-[#4b5563]">
        Or copy and paste this URL into your browser:
      </Text>
      <Link
        href={url}
        className="block text-[13px] leading-[20px] break-all text-[#002F87] no-underline"
      >
        {url}
      </Link>

      <Text className="mt-[24px] mb-0 text-[14px] leading-[22px] text-[#1f2937]">
        For your security, don&apos;t share this link with anyone.
      </Text>

      <Text className="mt-[12px] mb-0 text-[14px] leading-[22px] text-[#1f2937]">
        If you didn&apos;t request this email, you can safely ignore it.
      </Text>

      <Hr className="mx-0 my-[28px] w-full border border-solid border-[#e5e7eb]" />

      <Text className="m-0 text-[14px] leading-[22px] text-[#1f2937]">
        Here&apos;s to faster, simpler private lending.
      </Text>
      <Text className="mt-0 mb-0 text-[14px] leading-[22px] text-[#1f2937]">The Vaster Team</Text>
    </NotificationLayout>
  )
}

MagicLinkEmail.PreviewProps = {
  url: 'https://vaster.app/api/auth/callback/email?token=sample-token&email=user@example.com',
  productName: 'Vaster',
  email: 'user@example.com',
} satisfies MagicLinkEmailProps

export default MagicLinkEmail
