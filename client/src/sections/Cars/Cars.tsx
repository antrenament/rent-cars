import React from 'react'
import { gql } from 'apollo-boost'
import { useQuery, useMutation } from 'react-apollo'
import {Cars as CarsData} from './__generated__/Cars'
import {DeleteCar as DeleteCarData, DeleteCarVariables} from './__generated__/DeleteCar'
import List from 'antd/es/list'

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
    <List 
    itemLayout="horizontal" 
    dataSource={cars} 
    renderItem={car => (
      <List.Item>
        <List.Item.Meta title={car.title} />
      </List.Item>
    )}/>
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
