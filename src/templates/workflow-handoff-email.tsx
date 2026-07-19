import {
  EmailAction,
  EmailDetails,
  EmailEyebrow,
  EmailHeading,
  EmailLinkFallback,
  EmailParagraph,
  InfoCallout,
} from '../components/email-content'
import { NotificationLayout } from '../components/notification-layout'
import type { EmailDetail } from '../types'

export interface WorkflowHandoffEmailProps {
  itemTitle: string
  completedStep: string
  nextStep: string
  actorName: string
  details?: EmailDetail[]
  actionUrl: string
  actionLabel?: string
}

export function WorkflowHandoffEmail({
  itemTitle,
  completedStep,
  nextStep,
  actorName,
  details = [],
  actionUrl,
  actionLabel = 'Open item',
}: WorkflowHandoffEmailProps) {
  return (
    <NotificationLayout preview={`${itemTitle} is ready for ${nextStep}`}>
      <EmailEyebrow>Workflow update</EmailEyebrow>
      <EmailHeading>{itemTitle} is ready for {nextStep}</EmailHeading>
      <EmailParagraph>
        <strong>{actorName}</strong> completed {completedStep}.
      </EmailParagraph>
      <InfoCallout>The next step is {nextStep}.</InfoCallout>
      <EmailDetails items={details} />
      <EmailAction href={actionUrl}>{actionLabel}</EmailAction>
      <EmailLinkFallback href={actionUrl} />
    </NotificationLayout>
  )
}

WorkflowHandoffEmail.PreviewProps = {
  itemTitle: 'Client travel reimbursement',
  completedStep: 'manager approval',
  nextStep: 'finance processing',
  actorName: 'Alex Morgan',
  details: [
    { label: 'Requester', value: 'Jordan Lee' },
    { label: 'Amount', value: '$1,842.60 USD' },
    { label: 'Type', value: 'Reimbursement' },
  ],
  actionUrl: 'https://expenses.vaster.app/admin/expense-requests/sample-request',
  actionLabel: 'View expense',
} satisfies WorkflowHandoffEmailProps

export default WorkflowHandoffEmail
