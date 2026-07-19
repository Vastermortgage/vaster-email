import type { ReactNode } from 'react'
import { Button, Heading, Hr, Link, Section, Text } from 'react-email'

import type { EmailDetail } from '../types'

export function EmailEyebrow({ children }: { children: ReactNode }) {
  return (
    <Text className="mt-0 mb-[8px] text-[12px] leading-[16px] font-semibold tracking-[0.08em] text-[#002F87] uppercase">
      {children}
    </Text>
  )
}

export function EmailHeading({ children }: { children: ReactNode }) {
  return (
    <Heading className="mt-0 mb-[20px] p-0 text-left text-[28px] leading-[34px] font-bold text-black">
      {children}
    </Heading>
  )
}

export function EmailParagraph({ children }: { children: ReactNode }) {
  return <Text className="mt-0 mb-[20px] text-[15px] leading-[24px] text-[#1f2937]">{children}</Text>
}

export function EmailAction({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Section className="my-[24px] text-center">
      <Button
        href={href}
        className="rounded-[8px] bg-[#002F87] px-[28px] py-[14px] text-center text-[14px] font-semibold text-white no-underline"
      >
        {children}
      </Button>
    </Section>
  )
}

export function EmailLinkFallback({ href }: { href: string }) {
  return (
    <>
      <Text className="mt-0 mb-[8px] text-[13px] leading-[22px] text-[#4b5563]">
        Or copy and paste this URL into your browser:
      </Text>
      <Link
        href={href}
        className="block text-[13px] leading-[20px] break-all text-[#002F87] no-underline"
      >
        {href}
      </Link>
    </>
  )
}

export function EmailCard({ children }: { children: ReactNode }) {
  return <Section className="my-[24px] rounded-[12px] bg-[#f5f5f7] px-[24px] py-[20px]">{children}</Section>
}

export function EmailDetails({ items }: { items: EmailDetail[] }) {
  if (items.length === 0) return null

  return (
    <EmailCard>
      {items.map((item) => (
        <Text key={`${item.label}-${item.value}`} className="mt-0 mb-[8px] text-[14px] leading-[22px] text-[#4b5563]">
          <strong className="text-black">{item.label}:</strong> {item.value}
        </Text>
      ))}
    </EmailCard>
  )
}

function Callout({ children, className }: { children: ReactNode; className: string }) {
  return (
    <Section className={`my-[24px] rounded-[10px] border border-solid px-[20px] py-[16px] ${className}`}>
      <Text className="m-0 text-[14px] leading-[22px]">{children}</Text>
    </Section>
  )
}

export function InfoCallout({ children }: { children: ReactNode }) {
  return <Callout className="border-[#bfdbfe] bg-[#eff6ff] text-[#1e3a8a]">{children}</Callout>
}

export function SuccessCallout({ children }: { children: ReactNode }) {
  return <Callout className="border-[#bbf7d0] bg-[#f0fdf4] text-[#166534]">{children}</Callout>
}

export function DangerCallout({ children }: { children: ReactNode }) {
  return <Callout className="border-[#fecaca] bg-[#fef2f2] text-[#991b1b]">{children}</Callout>
}

export function EmailDivider() {
  return <Hr className="mx-0 my-[28px] w-full border border-solid border-[#e5e7eb]" />
}
