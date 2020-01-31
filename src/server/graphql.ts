import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList
} from 'graphql'
import { dummyData } from './dummyData'

const Car = new GraphQLObjectType({
  name: "cars",
  fields: {
    id: { type: GraphQLNonNull(GraphQLID) },
    title: { type: GraphQLNonNull(GraphQLString) },
    image: { type: GraphQLNonNull(GraphQLString) },
    address: { type: GraphQLNonNull(GraphQLString) },
    price: { type: GraphQLNonNull(GraphQLString) },
    numOfGuests: { type: GraphQLNonNull(GraphQLInt) },
    numOfBaths: { type: GraphQLNonNull(GraphQLInt) },
    rating: { type: GraphQLNonNull(GraphQLInt) }
  }
})

const query = new GraphQLObjectType({
  name: "Query",
  fields: {
    dummyData: {
      type: GraphQLNonNull(GraphQLList(GraphQLNonNull(Car))),
      resolve: () => {
        return dummyData;
      }
    },
    hello: {
      type: GraphQLString,
      resolve: () => 'Hello from testing'
    }
  }
})

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    deleteCar: {
      type: GraphQLNonNull(Car),
      args: {
        id: { type: GraphQLNonNull(GraphQLID) }
      },
      resolve: (_root, { id }) => {
        for (let i = 0; i < dummyData.length; i++) {
          if (dummyData[i].id === id) {
            return dummyData.splice(i, 1)[0]
          }
        }

        throw new Error('Failed to delete car')
      }
    }
  }
})

export const schema = new GraphQLSchema({ query, mutation })