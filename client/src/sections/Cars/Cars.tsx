import React from 'react'
import { server } from '../../lib/api'
import { CarsData, DeleteCar, DeleteCarVariables, Car } from './types'
import { useQuery } from './../../lib/api'

const CARS = `
  query Cars {
    cars {
      id
      title
      image
      address
      price
      numOfGuests
      numOfBaths
      rating
    }
  }
`

const DELETE_CAR = `
mutation DeleteCar($id: ID!) {
  deleteCar(id: $id) {
    id
  }
}`

interface Props {
  title: string
}

export const Cars = ({ title }: Props) => {
  const { data, loading, error, refetch } = useQuery<CarsData>(CARS)

  console.log(data)
  const deleteCar = async (id: string) => {
    await server.fetch<DeleteCar, DeleteCarVariables>({
      query: DELETE_CAR,
      variables: {
        id
      }
    })
    refetch()
  }

  const cars = data ? data.cars : null

  const carList = cars ? (
    <ul>
      {console.log(cars)}
      {cars &&
        cars.map(car => {
          return (
            <li key={car.id} onClick={() => deleteCar(car.id)}>
              {car.title}
            </li>
          )
        })}
    </ul>
  ) : null

  if (loading) {
    return <h2>Loading..</h2>
  }

  if (error) {
    return <h2> Uh oh! Something went wrong - please try again later</h2>
  }

  return (
    <div>
      <h2> {title} </h2>
      {carList}
    </div>
  )
}
