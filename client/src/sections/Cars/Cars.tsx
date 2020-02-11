import React from 'react'
import { server } from '../../lib/api'
import { CarsData, DeleteCar, DeleteCarVariables } from './types'

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
  const fetchCars = async () => {
    const { data } = await server.fetch<CarsData>({ query: CARS })
    console.log(data)
  }

  const deleteCar = async () => {
    const { data } = await server.fetch<DeleteCar, DeleteCarVariables>({
      query: DELETE_CAR,
      variables: {
        id: '5e39fcf6fcd63610a6204827'
      }
    })
  }

  return (
    <div>
      <h2> {title} </h2>
      <button onClick={fetchCars}>Querry Cars</button>
      <button onClick={deleteCar}>Delete a Car</button>
    </div>
  )
}
