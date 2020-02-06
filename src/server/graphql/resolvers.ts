import { IResolvers } from 'apollo-server-express'
import { Database, Car } from '../../lib/types'
import { ObjectId } from 'mongodb'

export const resolvers: IResolvers = {
  Query: {
    cars: async (
      _root: undefined,
      _args: {},
      { db }: { db: Database }
    ): Promise<Car[]> => {
      return await db.cars.find({}).toArray()
    }
  },
  Mutation: {
    deleteCar: async (
      _root: undefined,
      { id }: { id: string },
      { db }: { db: Database }
    ): Promise<Car> => {
      const deleteRes = await db.cars.findOneAndDelete({
        _id: new ObjectId(id)
      })

      if (!deleteRes.value) {
        throw new Error('failed to delete cars')
      }

      return deleteRes.value
    }
  },
  Car: {
    id: (car: Car): string => car._id.toString()
  }
}
