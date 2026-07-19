import { Section } from 'react-email'

import { NotificationLogo } from './notification-logo'

export function NotificationHeader() {
  return (
    <Section
      className="rounded-[16px] py-[44px] text-center"
      style={{
        background: 'linear-gradient(135deg, #DCE7FF 0%, #EFE9FF 50%, #DDF5EC 100%)',
      }}
    >
      <NotificationLogo />
    </Section>
  )
}

export default NotificationHeader
