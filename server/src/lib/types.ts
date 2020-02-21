import { ObjectId, Collection } from 'mongodb'

export interface Car {
  _id: ObjectId
  title: string
  image: string
  address: string
  price: number
  numOfGuests: number
  numOfBeds: number
  numOfBaths: number
  rating: number
}

export interface Database {
  cars: Collection<Cars>
}
