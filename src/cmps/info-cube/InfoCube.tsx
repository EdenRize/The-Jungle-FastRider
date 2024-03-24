import { FC } from 'react'

interface InfoCubeProps {
  children?: React.ReactNode
  color: string
  isHoverable?: boolean
}

const InfoCube: FC<InfoCubeProps> = ({ children, color, isHoverable }) => {
  return (
    <section className="info-cube">
      <div
        style={{ backgroundColor: color }}
        className={`${isHoverable ? 'hoverable' : ''} top-color`}
      ></div>

      <div className="cube-content">{children}</div>
    </section>
  )
}

export default InfoCube
