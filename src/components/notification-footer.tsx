import { Link, Section, Text } from 'react-email'

import { NotificationLogo } from './notification-logo'

export function NotificationBrandSignature() {
  return (
    <Section className="mt-[24px]">
      <NotificationLogo variant="footer" />
      <Link
        href="https://www.vaster.com"
        className="mt-[8px] inline-block text-[13px] leading-[20px] email-brand text-[#002F87] no-underline"
      >
        Private lending, made faster.
      </Link>
    </Section>
  )
}

export function NotificationSubFooter() {
  return (
    <Section className="mt-[16px] px-[16px] text-center">
      <Text className="m-0 text-[12px] leading-[18px] email-muted text-[#6b7280]">
        This message was sent by Vaster.
      </Text>
      <Text className="mt-[6px] mb-0 text-[12px] leading-[18px] email-muted text-[#6b7280]">
        © 2026 Vaster
      </Text>
    </Section>
  )
}
