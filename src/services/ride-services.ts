import { Ride } from '../types/ride-types'
import { Ticket } from '../types/ticket-types'

const baseURL = 'http://fast-rider.herokuapp.com/api/v1/'
const token = '433898df4a3e992b8411004109e4d574a90695e39e'

export const getRides = async (): Promise<Ride[]> => {
  try {
    const response = await fetch(`${baseURL}rides?token=${token}`)
    if (!response.ok) {
      throw new Error('Failed to fetch rides')
    }
    const ridesData = await response.json()
    return ridesData
  } catch (err) {
    console.log('err', err)
    throw err
  }
}

export const bookTicket = async (
  rideId: number,
  PIN: string
): Promise<Ticket> => {
  try {
    const formData = new URLSearchParams()
    formData.append('pin', PIN)
    formData.append('ride_id', rideId.toString())
    formData.append('token', token)

    const response = await fetch(`${baseURL}tickets?api_key=${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
      body: formData,
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message)
    }

    const ticketData = await response.json()
    return ticketData
  } catch (err) {
    throw err
  }
}
