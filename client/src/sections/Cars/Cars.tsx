import React, { useState } from 'react'
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

  const fetchCars = async () => {
    const { data } = await server.fetch<CarsData>({ query: CARS })
    setCars(data.cars)
  }

  const deleteCar = async () => {
    const { data } = await server.fetch<DeleteCar, DeleteCarVariables>({
      query: DELETE_CAR,
      variables: {
        id: '5e39fcf6fcd63610a6204827'
      }
    })
  }

  const carList = cars ? (
    <ul>
      {cars &&
        cars.map(car => {
          return <li key={car.id}>{car.title}</li>
        })}
    </ul>
  ) : null

  return (
    <div>
      <h2> {title} </h2>
      {carList}
      <button onClick={fetchCars}>Querry Cars</button>
      <button onClick={deleteCar}>Delete a Car</button>
    </div>
  )
}
