import { FC } from 'react'
import InfoCube from './InfoCube'

export interface infoCubeProp {
  children: React.ReactNode
  color: string
}

interface InfoCubeListProps {
  infoCubes: infoCubeProp[]
  isHoverable?: boolean
}

const InfoCubeList: FC<InfoCubeListProps> = ({ infoCubes, isHoverable }) => {
  return (
    <section className="info-cube-list">
      {infoCubes.map((cube, idx) => (
        <InfoCube
          key={idx}
          color={cube.color}
          children={cube.children}
          isHoverable={isHoverable}
        />
      ))}
    </section>
  )
}

export default InfoCubeList
