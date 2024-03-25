import { ChangeEventHandler, FC, useEffect, useRef, useState } from 'react'
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
  const [isShowBtn, setIsShownBtn] = useState(false)
  const infoCubeListRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    loadRides()
  }, [])

  useEffect(() => {
    if (rides) updateInfoCubes(rides)
  }, [rides, selectedRide])

  useEffect(() => {
    const handleScroll = () => {
      if (!infoCubeListRef.current) return
      const rect = infoCubeListRef.current.getBoundingClientRect()
      if (rect.top <= 10) {
        setIsShownBtn(true)
        window.removeEventListener('scroll', handleScroll)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

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
        isShowBtn={isShowBtn}
      />

      <div ref={infoCubeListRef}>
        {infoCubes && <InfoCubeList infoCubes={infoCubes} isHoverable={true} />}
      </div>
    </section>
  )
}

export default RidesIndex
