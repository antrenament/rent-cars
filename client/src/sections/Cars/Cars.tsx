import React from 'react'
import { gql } from 'apollo-boost'
import { useQuery, useMutation } from 'react-apollo'
import Avatar from 'antd/es/avatar'
import Button from 'antd/es/button'
import {Cars as CarsData} from './__generated__/Cars'
import {DeleteCar as DeleteCarData, DeleteCarVariables} from './__generated__/DeleteCar'
import List from 'antd/es/list'
import './../../styles/Cars.css'


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
      <List.Item actions={[
      <Button 
      onClick={() => 
        handleDeleteCar(car.id)
      }
    > Delete 
    </Button>
  ]}>
        <List.Item.Meta 
        title={car.title} 
        description={car.address} 
        avatar={
        <Avatar 
          src={car.image} 
          shape='square' 
          size={48} />
        }/>
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
    <div className='cars'>
      <h2> {title} </h2>
      {carList}
      {deleteCarLoadingMessage}
      {deleteCarErrorMessage}
    </div>
  )
}
