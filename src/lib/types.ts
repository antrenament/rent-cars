import { ObjectId, Collection } from 'mongodb'

export interface Cars {
  _id: ObjectId
  title: string
  image: string
  address: string
  price: number
  numOfGuests: number
  numOfBeds: number
  numOfBats: number
  rating: number
}

export interface Database {
  cars: Collection<Cars>
}
