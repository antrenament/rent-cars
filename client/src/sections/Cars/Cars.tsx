import React, { FunctionComponent } from 'react'

interface Props {
  title: string
}

export const Cars = ({ title }: Props) => {
  return <h2> {title} </h2>
}

export const Cars2: FunctionComponent<Props> = ({ title }) => <h2>{title}</h2>
