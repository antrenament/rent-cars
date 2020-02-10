import React from 'react'
import { server } from '../../lib/api'

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
    const cars = await server.fetch({ query: CARS })
    console.log(cars)
  }
  return (
    <div>
      <h2> {title} </h2>
      <button onClick={fetchCars}>Querry Cars</button>
    </div>
  )
}
