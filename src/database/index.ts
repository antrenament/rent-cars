import { MongoClient } from 'mongodb'

const user = 'radustefan'
const password = process.env.REACT_APP_PASSWORD
const cluster = 'clusterzero-e97ub'


const url = `mongodb+srv://${user}:${password}@${cluster}.gcp.mongodb.net/test?retryWrites=true&w=majority`
export const connectDatabase = () => { }