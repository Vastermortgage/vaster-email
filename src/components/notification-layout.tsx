import { EmailHead } from './email-head'
import { type ReactNode } from 'react'
import { Body, Container, Html, Preview, Section, Tailwind } from 'react-email'

import { NotificationHeader } from './notification-header'
import { NotificationBrandSignature, NotificationSubFooter } from './notification-footer'

interface NotificationLayoutProps {
  preview: string
  children: ReactNode
}

export function NotificationLayout({ preview, children }: NotificationLayoutProps) {
  return (
    <Html>
      <EmailHead />
      <Preview>{preview}</Preview>
      <Tailwind>
        <Body className="m-auto email-page bg-[#f4f4f7] px-2 py-6 font-sans email-body text-[#1f2937]">
          <Container className="mx-auto max-w-[520px]">
            <NotificationHeader />
            <Section className="mt-[12px] rounded-[16px] email-surface bg-white px-[32px] py-[36px]">
              {children}
              <NotificationBrandSignature />
            </Section>
            <NotificationSubFooter />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export default NotificationLayout
