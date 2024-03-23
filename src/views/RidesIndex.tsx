import { ChangeEventHandler, useState } from 'react'
import { InfoIconItemProps } from '../cmps/info-icon/InfoIconItem'
import InfoIconList from '../cmps/info-icon/InfoIconList'
import InputBtn from '../cmps/InputBtn'

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
      </div>
    </section>
  )
}

export default RidesIndex
