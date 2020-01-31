import { IResolvers } from 'apollo-server-express'
import { cars } from '../cars'


export const resolvers: IResolvers = {
  Query: {
    cars: () => {
      return cars;
    }
  },
  Mutation: {
    deleteCar: (_root: undefined, { id }: { id: string }) => {
      for (let i = 0; i < cars.length; i++) {
        if (cars[i].id === id) {
          return cars.splice(i, 1)[0]
        }
      }

      throw new Error('failed to delete car')
    }
  }
}
