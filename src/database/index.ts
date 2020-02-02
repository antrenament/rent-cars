import { MongoClient } from 'mongodb'

const user = process.env.REACT_APP_USER
const password = process.env.REACT_APP_PASSWORD
const cluster = process.env.REACT_APP_CLUSTER

const url = `mongodb+srv://${user}:${password}@${cluster}.gcp.mongodb.net/test?retryWrites=true&w=majority`

export const connectDatabase = async () => {
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  const db = client.db('main')

  return {
    cars: db.collection('test_cars')
  }
}