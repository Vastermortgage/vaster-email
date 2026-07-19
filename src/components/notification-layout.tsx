import { type ReactNode } from 'react'
import { Body, Container, Head, Html, Preview, Section, Tailwind } from 'react-email'

import { NotificationHeader } from './notification-header'
import { NotificationBrandSignature, NotificationSubFooter } from './notification-footer'

interface NotificationLayoutProps {
  preview: string
  children: ReactNode
}

export function NotificationLayout({ preview, children }: NotificationLayoutProps) {
  return (
    <Html>
      <Head />
      <Preview>{preview}</Preview>
      <Tailwind>
        <Body className="m-auto bg-[#f4f4f7] px-2 py-6 font-sans">
          <Container className="mx-auto max-w-[520px]">
            <NotificationHeader />
            <Section className="mt-[12px] rounded-[16px] bg-white px-[32px] py-[36px]">
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
