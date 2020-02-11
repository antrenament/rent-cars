import React, { useState, useEffect } from 'react'
import { server } from '../../lib/api'
import { CarsData, DeleteCar, DeleteCarVariables, Car } from './types'

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
  const [cars, setCars] = useState<Car[] | null>(null)

  useEffect(() => {
    fetchCars()
  }, [])

  const fetchCars = async () => {
    const { data } = await server.fetch<CarsData>({ query: CARS })
    setCars(data.cars)
  }

  const deleteCar = async (id: string) => {
    await server.fetch<DeleteCar, DeleteCarVariables>({
      query: DELETE_CAR,
      variables: {
        id
      }
    })
    fetchCars()
  }

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

  return (
    <div>
      <h2> {title} </h2>
      {carList}
    </div>
  )
}
