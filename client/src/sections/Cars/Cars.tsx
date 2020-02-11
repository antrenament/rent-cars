import React from 'react'
import { server } from '../../lib/api'
import { CarsData } from './types'

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

interface Props {
  title: string
}

export const Cars = ({ title }: Props) => {
  const fetchCars = async () => {
    const { data } = await server.fetch<CarsData>({ query: CARS })
    console.log(data)
  }
  return (
    <div>
      <h2> {title} </h2>
      <button onClick={fetchCars}>Querry Cars</button>
    </div>
  )
}
