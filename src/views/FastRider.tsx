import { useEffect, useState } from 'react'
import RidesIndex from './RidesIndex'
import { Ticket } from '../types/ticket-types'

const FastRider = () => {
  const [ticket, setTicket] = useState<null | Ticket>(null)

  useEffect(() => {
    checkAndRemoveExpiredTicket()
  }, [])

  const checkAndRemoveExpiredTicket = () => {
    try {
      const ticketString = localStorage.getItem('ticket')
      if (!ticketString) {
        console.log('No ticket found in local storage')
        return // No ticket found, no action needed
      }

      const ticket = JSON.parse(ticketString)
      const returnTime = new Date(ticket.return_time).getTime()
      const currentTime = Date.now()

      if (currentTime >= returnTime) {
        localStorage.removeItem('ticket')
        console.log('Expired ticket removed from local storage')
      } else {
        console.log('ticket', ticket)
        setTicket(ticket)
      }
    } catch (error) {
      console.error('Error checking ticket:', error)
    }
  }

  return (
    <section className="page-layout fast-rider">
      <div className="page-content">
        <h1 className="page-title">The Jungle™ FastRider Service</h1>

        <RidesIndex setTicket={setTicket} />
      </div>
    </section>
  )
}

export default FastRider
