import { Img } from 'react-email'

interface NotificationLogoProps {
  variant?: 'hero' | 'footer'
}

export function NotificationLogo({ variant = 'hero' }: NotificationLogoProps = {}) {
  if (variant === 'footer') {
    return (
      <Img
        src="https://www.vaster.app/vaster_logo_brand.svg"
        width="92"
        height="15"
        alt="Vaster"
        className="my-0"
      />
    )
  }

  return (
    <Img
      src="https://www.vaster.app/vaster_logo_brand.svg"
      width="160"
      height="27"
      alt="Vaster"
      className="mx-auto my-0"
    />
  )
}

export default NotificationLogo
