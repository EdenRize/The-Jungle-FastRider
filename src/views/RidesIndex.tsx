import { ChangeEventHandler, useEffect, useState } from 'react'
import { InfoIconItemProps } from '../cmps/info-icon/InfoIconItem'
import InfoIconList from '../cmps/info-icon/InfoIconList'
import InputBtn from '../cmps/InputBtn'
import InfoCubeList, { infoCubeProp } from '../cmps/info-cube/InfoCubeList'
import RideInfo from '../cmps/info-cube/RideInfo'
import { getRides } from '../services/ride-services'
import { Ride } from '../types/ride-types'

const RidesIndex = () => {
  const [pin, setPin] = useState<string>('')
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

  const onFormSubmit = (ev: React.FormEvent<HTMLFormElement>): void => {}

  const onPINChange: ChangeEventHandler<HTMLInputElement> = (ev) => {
    setPin(ev.target.value)
  }

  const onRideClick = (rideId: number) => {
    setSelectedRide((prevRide) => (prevRide === rideId ? null : rideId))
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

        {infoCubes && <InfoCubeList infoCubes={infoCubes} isHoverable={true} />}
      </div>
    </section>
  )
}

export default RidesIndex
