import { FC, useEffect, useState } from 'react'

interface ErrorMsgProps {
  msg?: string
  setMsg: Function
  showTime?: number
}

const ErrorMsg: FC<ErrorMsgProps> = ({ msg, setMsg, showTime = 2500 }) => {
  const [currMsg, setCurrMsg] = useState<string>('')
  useEffect(() => {
    if (msg) {
      setCurrMsg(msg)

      setTimeout(() => {
        setMsg('')
      }, showTime)
    }
  }, [msg])

  return (
    <section className={`${msg ? 'shown' : ''} error-msg`}>
      <p className="bold white">{currMsg}</p>
    </section>
  )
}

export default ErrorMsg
