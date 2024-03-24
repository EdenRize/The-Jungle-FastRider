import { ChangeEventHandler, useState } from 'react'
import { InfoIconItemProps } from '../cmps/info-icon/InfoIconItem'
import InfoIconList from '../cmps/info-icon/InfoIconList'
import InputBtn from '../cmps/InputBtn'
import InfoCube from '../cmps/info-cube/InfoCube'
import InfoCubeList, { infoCubeProp } from '../cmps/info-cube/InfoCubeList'

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

  const infoCubes: infoCubeProp[] = [
    { children: <h1>helkofkosd</h1>, color: 'red' },
    { children: <h1>helkofkosd</h1>, color: 'red' },
    { children: <h1>helkofkosd</h1>, color: 'red' },
    { children: <h1>helkofkosd</h1>, color: 'red' },
    { children: <h1>helkofkosd</h1>, color: 'red' },
    { children: <h1>helkofkosd</h1>, color: 'red' },
    { children: <h1>helkofkosd</h1>, color: 'red' },
  ]

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
