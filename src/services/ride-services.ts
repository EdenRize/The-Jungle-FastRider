import { Ride } from '../types/ride-types'

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
