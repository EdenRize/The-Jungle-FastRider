import { ChangeEventHandler, useState } from 'react'
import { InfoIconItemProps } from '../cmps/info-icon/InfoIconItem'
import InfoIconList from '../cmps/info-icon/InfoIconList'
import InputBtn from '../cmps/InputBtn'
import InfoCubeList, { infoCubeProp } from '../cmps/info-cube/InfoCubeList'
import { Ride } from '../types/ride-types'
import RideInfo from '../cmps/info-cube/RideInfo'

const RidesIndex = () => {
  const [pin, setPin] = useState('')

  const infoIcons: InfoIconItemProps[] = [
    {
      iconPath: 'src/assets/icons/ticket.svg',
      text: 'Enter your park ticket #PIN number, then select the desired ride while noting the stated return time',
    },
    {
      iconPath: 'src/assets/icons/arrow.svg',
      text: 'Press ʻsubmitʻ to confirm and retrieve your access code',
    },
    {
      iconPath: 'src/assets/icons/clock.svg',
      text: 'When the time comes, use the special FastRider line to cut out a considerable wait time',
    },
  ]

  const rides: Ride[] = [
    {
      id: 1,
      zone: {
        id: 0,
        color: 'red',
        name: 'Mandrill Town',
      },
      name: 'Big Town Hall Slides',
      remaining_tickets: 22,
      return_time: '2024-03-24T09:26:15.629Z',
    },
    {
      id: 2,
      zone: {
        id: 0,
        color: 'blue',
        name: 'Mandrill Town',
      },
      name: 'Big Town Hall Slides',
      remaining_tickets: 22,
      return_time: '2024-03-24T09:26:15.629Z',
    },
    {
      id: 3,
      zone: {
        id: 0,
        color: 'yellow',
        name: 'Mandrill Town',
      },
      name: 'Big Town Hall Slides',
      remaining_tickets: 22,
      return_time: '2024-03-24T09:26:15.629Z',
    },
    {
      id: 4,
      zone: {
        id: 0,
        color: 'green',
        name: 'Mandrill Town',
      },
      name: 'Big Town Hall Slides',
      remaining_tickets: 22,
      return_time: '2024-03-24T09:26:15.629Z',
    },
  ]

  const infoCubes: infoCubeProp[] = rides.map((ride) => ({
    children: <RideInfo ride={ride} onClick={(rideId) => {}} />,
    color: ride.zone.color,
  }))

  const onFormSubmit = (ev: React.FormEvent<HTMLFormElement>): void => {}

  const onPINChange: ChangeEventHandler<HTMLInputElement> = (ev) => {
    setPin(ev.target.value)
  }

  return (
    <section className="page-layout rides-index">
      <div className="page-content">
        <h1 className="page-title">The Jungle™ FastRider Service</h1>

        <InfoIconList InfoIcons={infoIcons} />

        <InputBtn
          onChange={onPINChange}
          onSubmit={onFormSubmit}
          value={pin}
          placeholder="#PIN"
        />

        <InfoCubeList infoCubes={infoCubes} isHoverable={true} />
      </div>
    </section>
  )
}

export default RidesIndex
