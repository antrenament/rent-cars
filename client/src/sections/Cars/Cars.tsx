import React from 'react'
import { gql } from 'apollo-boost'
import { useQuery, useMutation } from 'react-apollo'
import { Alert, Avatar, Button, List, Spin } from 'antd'
import { Cars as CarsData } from './__generated__/Cars'
import {
  DeleteCar as DeleteCarData,
  DeleteCarVariables
} from './__generated__/DeleteCar'
import './styles/Cars.css'
import { CarsSkeleton } from './components'

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
      itemLayout='horizontal'
      dataSource={cars}
      renderItem={car => (
        <List.Item
          actions={[
            <Button onClick={() => handleDeleteCar(car.id)}> Delete</Button>
          ]}
        >
          <List.Item.Meta
            title={car.title}
            description={car.address}
            avatar={<Avatar src={car.image} shape='square' size={48} />}
          />
        </List.Item>
      )}
    />
  ) : null

  if (loading) {
    return (
      <div className='cars'>
        <CarsSkeleton title={title} error />
      </div>
    )
  }

  if (error) {
    return (
      <div className='cars'>
        <CarsSkeleton title={title} error />
      </div>
    )
  }

  const deleteCarErrorAlert = deleteCarError ? (
    <Alert
      type='error'
      message='Uh oh! Something went wrong - please try again later :('
      className='cars__alert'
    />
  ) : null

  return (
    <div className='cars'>
      <Spin spinning={deleteCarLoading}>
        {deleteCarErrorAlert}
        <h2> {title} </h2>
        {carList}
      </Spin>
    </div>
  )
}
