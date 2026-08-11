import type { ReactElement } from 'react'
import { render, toPlainText } from 'react-email'

import { ApplicationSharedEmail, type ApplicationSharedEmailProps } from './templates/application-shared-email'
import {
  ApplicationStartedEmail,
  type ApplicationStartedEmailProps,
} from './templates/application-started-email'
import { ApprovalRequestEmail, type ApprovalRequestEmailProps } from './templates/approval-request-email'
import {
  CommentNotificationEmail,
  type CommentNotificationEmailProps,
} from './templates/comment-notification-email'
import { FeedbackReceivedEmail, type FeedbackReceivedEmailProps } from './templates/feedback-received-email'
import { InvitationEmail, type InvitationEmailProps } from './templates/invitation-email'
import { MagicLinkEmail, type MagicLinkEmailProps } from './templates/magic-link-email'
import {
  ProcessingCompletedEmail,
  type ProcessingCompletedEmailProps,
} from './templates/processing-completed-email'
import { ProcessingFailedEmail, type ProcessingFailedEmailProps } from './templates/processing-failed-email'
import { RequestApprovedEmail, type RequestApprovedEmailProps } from './templates/request-approved-email'
import {
  RequestCompletedEmail,
  type RequestCompletedEmailProps,
} from './templates/request-completed-email'
import { RequestRejectedEmail, type RequestRejectedEmailProps } from './templates/request-rejected-email'
import { RequestUpdatedEmail, type RequestUpdatedEmailProps } from './templates/request-updated-email'
import { WelcomeEmail, type WelcomeEmailProps } from './templates/welcome-email'
import { WorkflowHandoffEmail, type WorkflowHandoffEmailProps } from './templates/workflow-handoff-email'

export interface RenderedEmail {
  subject: string
  html: string
  text: string
}

export async function renderEmail(subject: string, element: ReactElement): Promise<RenderedEmail> {
  const html = await render(element)

  return {
    subject: subject.replace(/[\r\n]+/g, ' ').trim(),
    html,
    text: toPlainText(html),
  }
}

export function renderMagicLinkEmail(props: MagicLinkEmailProps) {
  return renderEmail(`Your ${props.productName} sign-in link`, <MagicLinkEmail {...props} />)
}

export function renderInvitationEmail(props: InvitationEmailProps) {
  const subject = props.organizationName
    ? `Join ${props.organizationName} on ${props.productName}`
    : `You're invited to ${props.productName}`
  return renderEmail(subject, <InvitationEmail {...props} />)
}

export function renderWelcomeEmail(props: WelcomeEmailProps) {
  return renderEmail(`Welcome to ${props.productName}`, <WelcomeEmail {...props} />)
}

export function renderApprovalRequestEmail(props: ApprovalRequestEmailProps) {
  const isExpense = props.requestType?.toLowerCase().includes('expense') ?? false
  const subject = isExpense
    ? `Expense approval needed: ${props.requestTitle}`
    : `Action required: ${props.requestTitle}`

  return renderEmail(subject, <ApprovalRequestEmail {...props} />)
}

export function renderCommentNotificationEmail(props: CommentNotificationEmailProps) {
  return renderEmail(`New comment on ${props.requestTitle}`, <CommentNotificationEmail {...props} />)
}

export function renderRequestUpdatedEmail(props: RequestUpdatedEmailProps) {
  return renderEmail(`${props.requestTitle} was updated`, <RequestUpdatedEmail {...props} />)
}

export function renderRequestApprovedEmail(props: RequestApprovedEmailProps) {
  return renderEmail(`${props.requestTitle} was approved`, <RequestApprovedEmail {...props} />)
}

export function renderRequestRejectedEmail(props: RequestRejectedEmailProps) {
  return renderEmail(`${props.requestTitle} was not approved`, <RequestRejectedEmail {...props} />)
}

export function renderRequestCompletedEmail(props: RequestCompletedEmailProps) {
  return renderEmail(`${props.requestTitle} was completed`, <RequestCompletedEmail {...props} />)
}

export function renderWorkflowHandoffEmail(props: WorkflowHandoffEmailProps) {
  return renderEmail(`${props.itemTitle} is ready for ${props.nextStep}`, <WorkflowHandoffEmail {...props} />)
}

export function renderProcessingCompletedEmail(props: ProcessingCompletedEmailProps) {
  return renderEmail(`${props.itemName} is ready`, <ProcessingCompletedEmail {...props} />)
}

export function renderProcessingFailedEmail(props: ProcessingFailedEmailProps) {
  return renderEmail(`Processing failed for ${props.itemName}`, <ProcessingFailedEmail {...props} />)
}

export function renderFeedbackReceivedEmail(props: FeedbackReceivedEmailProps) {
  return renderEmail(
    `[Vaster feedback] ${props.severity}/${props.category} in ${props.appName}`,
    <FeedbackReceivedEmail {...props} />,
  )
}

export function renderApplicationSharedEmail(props: ApplicationSharedEmailProps) {
  return renderEmail('Vaster Private Application Link', <ApplicationSharedEmail {...props} />)
}

export function renderApplicationStartedEmail(props: ApplicationStartedEmailProps) {
  return renderEmail(
    'Vaster Private Application Link - New Application Started',
    <ApplicationStartedEmail {...props} />,
  )
}
