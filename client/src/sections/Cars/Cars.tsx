import React from 'react'
import { gql } from 'apollo-boost'
import { CarsData, DeleteCarData, DeleteCarVariables, Car } from './types'
import { useQuery, useMutation } from 'react-apollo'

const CARS = gql`
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

const DELETE_CAR = gql`
  mutation DeleteCar($id: ID!) {
    deleteCar(id: $id) {
      id
    }
  }
`

interface Props {
  title: string
}

export const Cars = ({ title }: Props) => {
  const { data, loading, error, refetch } = useQuery<CarsData>(CARS)

  const [
    deleteCar,
    { loading: deleteCarLoading, error: deleteCarError }
  ] = useMutation<DeleteCarData, DeleteCarVariables>(DELETE_CAR)

  const handleDeleteCar = async (id: string) => {
    await deleteCar({ variables: { id } })
    refetch()
  }

  const cars = data ? data.cars : null

  const carList = cars ? (
    <ul>
      {cars &&
        cars.map(car => {
          return (
            <li key={car.id} onClick={() => handleDeleteCar(car.id)}>
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

  const deleteCarLoadingMessage = deleteCarLoading ? (
    <h4>Deletition in progress...</h4>
  ) : null

  const deleteCarErrorMessage = deleteCarError ? (
    <h4>
      Uh oH! Something went wrong with deleting : please try again later :()
    </h4>
  ) : null

  return (
    <div>
      <h2> {title} </h2>
      {carList}
      {deleteCarLoadingMessage}
      {deleteCarErrorMessage}
    </div>
  )
}
