import { Img } from 'react-email'

// A light backing keeps the transparent blue wordmark legible even when a
// client recolors the surrounding email. Gradients resist partial inversion.
const logoStyle = {
  backgroundColor: '#eef3ff',
  backgroundImage: 'linear-gradient(#eef3ff, #eef3ff)',
  borderRadius: '8px',
  padding: '12px 16px',
  color: '#002f87',
}

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
        style={logoStyle}
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
      style={logoStyle}
    />
  )
}

export default NotificationLogo
