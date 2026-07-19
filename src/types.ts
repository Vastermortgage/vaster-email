export interface EmailDetail {
  label: string
  value: string
}

export interface RequestDecisionEmailProps {
  requestTitle: string
  recipientName?: string
  actorName: string
  amountLabel?: string
  notes?: string
  requestUrl: string
}
