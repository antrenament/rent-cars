import { IResolvers } from 'apollo-server-express'
import { Database } from '../../lib/types'
import { ObjectId } from 'mongodb'

export const resolvers: IResolvers = {
  Query: {
    cars: async (_root: undefined, _args: {}, { db }: { db: Database }) => {
      return await db.cars.find({}).toArray()
    }
  },
  Mutation: {
    deleteCar: async (
      _root: undefined,
      { id }: { id: string },
      { db }: { db: Database }
    ) => {
      const deleteRes = await db.cars.findOneAndDelete({
        _id: new ObjectId(id)
      })

      if (!deleteRes.value) {
        throw new Error('failed to delete cars')
      }

      return deleteRes.value
    }
  }
}
