import { MongoClient } from 'mongodb'
import { Database, Booking, Listing, User } from "../lib/types";


const user = process.env.REACT_APP_USER
const password = process.env.REACT_APP_PASSWORD
const cluster = process.env.REACT_APP_CLUSTER

const url = `mongodb+srv://${user}:${password}@${cluster}.gcp.mongodb.net/test?retryWrites=true&w=majority`

export const connectDatabase = async (): Promise<Database> => {
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  const db = client.db('main')

  return {
    bookings: db.collection<Booking>("bookings"),
    listings: db.collection<Listing>("listings"),
    users: db.collection<User>("users")
  }
}
