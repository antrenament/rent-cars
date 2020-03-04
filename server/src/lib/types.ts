import { ObjectId, Collection } from 'mongodb'

export enum ListingType {
  Car = "CAR",
  Van = "VAN",
  Truck = "TRUCK"
}

export interface BookingIndexMonth {
  [key: string]: boolean
}

export interface BookingsIndexYear {
  [key: string]: BookingIndexMonth;
}

export interface BookingsIndex {
  [key: string]: BookingsIndexYear
}

export interface Booking {
  _id: ObjectId;
  listing: ObjectId;
  client: string;
  checkIn: string;
  checkOut: string;
}
export interface Listing {
  _id: ObjectId;
  title: string;
  description: string;
  image: string; 
  host: string;
  type: ListingType;
  address: string;
  country: string;
  admin: string;
  city: string;
  bookings: ObjectId[];
  model?: string;
  year?: number;
  milage?: number;
  bookingsIndex: BookingsIndex;
  price: number;
  seats: number;
}

export interface User {
  _id: string;
  token: string;
  name: string;
  avatar: string;
  contact: string;
  walletId?: string;
  income: number;
  bookings: ObjectId[];
  listings: ObjectId[];
}

export interface Database {
  bookings: Collection<Booking>;
  listings: Collection<Listing>;
  users: Collection<User>;
}
