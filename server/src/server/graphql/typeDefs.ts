import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  type Car {
      id: ID!
      title: String!
      image: String!
      address: String!
      price: Int!
      numOfGuests: Int!
      numOfBaths: Int!
      rating: Int!
  }

  type Query {
    cars: [Car!]!
  }

  type Mutation {
    deleteCar(id: ID!): Car!
  }
`