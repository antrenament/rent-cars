import React from 'react'
import { Alert, Skeleton, Divider } from 'antd'
import './styles/CarsSkeleton.css'

interface Props {
  title: string
  error: boolean
}

export const CarsSkeleton = ({ title, error = false }: Props) => {
  const errorAlert = error ? (
    <Alert
      type='error'
      message='Uh oh! Something went wrong - please try again later :('
      className='cars-skeleton__alert'
    />
  ) : null
  return (
    <div className='cars-skeleton'>
      {errorAlert}
      <h2>{title}</h2>
      <Skeleton active paragraph={{ rows: 1 }} />
      <Divider />
      <Skeleton active paragraph={{ rows: 1 }} />
      <Divider />
      <Skeleton active paragraph={{ rows: 1 }} />
    </div>
  )
}
