import { FC, MouseEventHandler } from 'react'

interface InfoCubeProps {
  children?: React.ReactNode
  color: string
  isHoverable?: boolean
  onClick?: MouseEventHandler<HTMLElement>
}

const InfoCube: FC<InfoCubeProps> = ({
  children,
  color,
  isHoverable,
  onClick,
}) => {
  return (
    <section onClick={onClick} className="info-cube">
      <div
        style={{ backgroundColor: color }}
        className={`${isHoverable ? 'hoverable' : ''} top-color`}
      ></div>
      {children}
    </section>
  )
}

export default InfoCube
