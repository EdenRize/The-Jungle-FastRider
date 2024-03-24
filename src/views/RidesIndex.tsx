import { ChangeEventHandler, FC, useEffect, useState } from 'react'
import { InfoIconItemProps } from '../cmps/info-icon/InfoIconItem'
import InfoIconList from '../cmps/info-icon/InfoIconList'
import InputBtn from '../cmps/InputBtn'
import InfoCubeList, { infoCubeProp } from '../cmps/info-cube/InfoCubeList'
import RideInfo from '../cmps/info-cube/RideInfo'
import { bookTicket, getRides } from '../services/ride-services'
import { Ride } from '../types/ride-types'
import { Ticket } from '../types/ticket-types'

interface RidesIndexProps {
  setTicket: (ticket: Ticket | null) => void
}

const RidesIndex: FC<RidesIndexProps> = ({ setTicket }) => {
  const [pin, setPin] = useState<string>(localStorage.getItem('PIN') || '')
  const [rides, setRides] = useState<null | Ride[]>(null)
  const [infoCubes, setInfoCubes] = useState<null | infoCubeProp[]>(null)
  const [selectedRide, setSelectedRide] = useState<null | number>(null)

  useEffect(() => {
    loadRides()
  }, [])

  useEffect(() => {
    if (rides) updateInfoCubes(rides)
  }, [rides, selectedRide])

  const loadRides = async () => {
    try {
      const rides = await getRides()
      setRides(rides)
    } catch (err) {
      console.log('err', err)
    }
  }

  const updateInfoCubes = (rides: Ride[]) => {
    const cubes = rides.map((ride) => ({
      children: <RideInfo ride={ride} onClick={onRideClick} />,
      color: ride.zone.color,
      isSelected: selectedRide === ride.id,
    }))
    setInfoCubes(cubes)
  }

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

  const onFormSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    try {
      ev.preventDefault()
      localStorage.setItem('PIN', pin)
      if (!selectedRide) {
        console.log('no selected ride')
        return
      }

      const ticket = await bookTicket(selectedRide, pin)
      localStorage.setItem('ticket', JSON.stringify(ticket))
      setTicket(ticket)
    } catch (err) {
      console.log('err', err)
    }
  }

  const onPINChange: ChangeEventHandler<HTMLInputElement> = (ev) => {
    setPin(ev.target.value)
  }

  const onRideClick = (rideId: number) => {
    setSelectedRide((prevRide) => (prevRide === rideId ? null : rideId))
  }

  return (
    <section className="rides-index">
      <InfoIconList InfoIcons={infoIcons} />

      <InputBtn
        onChange={onPINChange}
        onSubmit={onFormSubmit}
        value={pin}
        placeholder="#PIN"
      />

      {infoCubes && <InfoCubeList infoCubes={infoCubes} isHoverable={true} />}
    </section>
  )
}

export default RidesIndex
