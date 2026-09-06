import { EmailHead } from './email-head'
import type { ReactNode } from 'react'
import { Body, Container, Html, Preview, Section, Tailwind, Text } from 'react-email'

interface InternalNotificationLayoutProps {
  preview: string
  children: ReactNode
}

/**
 * A restrained, image-free shell for operational emails sent between team
 * members. Account and customer-facing messages should use NotificationLayout.
 */
export function InternalNotificationLayout({ preview, children }: InternalNotificationLayoutProps) {
  return (
    <Html>
      <EmailHead />
      <Preview>{preview}</Preview>
      <Tailwind>
        <Body className="m-auto email-surface bg-white px-[20px] py-[32px] font-sans email-body text-[#1f2937]">
          <Container className="mx-auto max-w-[560px]">
            <Section className="border-0 border-b border-solid email-border border-[#e5e7eb] pb-[16px]">
              <Text className="m-0 text-[12px] leading-[16px] font-bold tracking-[0.12em] email-brand text-[#002F87] uppercase">
                Vaster
              </Text>
            </Section>
            <Section className="py-[28px]">{children}</Section>
            <Section className="border-0 border-t border-solid email-border border-[#e5e7eb] pt-[16px]">
              <Text className="m-0 text-[12px] leading-[18px] email-muted text-[#6b7280]">
                Automated notification from Vaster
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export default InternalNotificationLayout
