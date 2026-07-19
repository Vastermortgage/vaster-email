import type { ReactNode } from 'react'

import { EmailAction, EmailDetails, EmailHeading, EmailLinkFallback, EmailParagraph } from './email-content'
import type { EmailDetail, RequestDecisionEmailProps } from '../types'

interface RequestDecisionContentProps extends RequestDecisionEmailProps {
  heading: string
  summary: string
  details?: EmailDetail[]
  children?: ReactNode
}

export function RequestDecisionContent({
  recipientName,
  heading,
  summary,
  amountLabel,
  notes,
  details = [],
  requestUrl,
  children,
}: RequestDecisionContentProps) {
  const decisionDetails = [
    ...(amountLabel ? [{ label: 'Amount', value: amountLabel }] : []),
    ...details,
    ...(notes ? [{ label: 'Notes', value: notes }] : []),
  ]

  return (
    <>
      <EmailHeading>{heading}</EmailHeading>
      {children}
      {recipientName && <EmailParagraph>Hi {recipientName},</EmailParagraph>}
      <EmailParagraph>{summary}</EmailParagraph>
      <EmailDetails items={decisionDetails} />
      <EmailAction href={requestUrl}>View request</EmailAction>
      <EmailLinkFallback href={requestUrl} />
    </>
  )
}
