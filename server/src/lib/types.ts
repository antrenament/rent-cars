import { ObjectId, Collection } from 'mongodb'

export interface Booking {
  _id: ObjectId
}
export interface Listing {
  _id: ObjectId;
}

export interface User {
  _id: string;
}

export interface Database {
  booking: Collection<Booking>
  listings: Collection<Listing>
  users: Collection<User>
}
