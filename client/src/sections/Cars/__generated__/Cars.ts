/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Cars
// ====================================================

export interface Cars_cars {
  __typename: "Car";
  id: string;
  title: string;
  image: string;
  address: string;
  price: number;
  numOfGuests: number;
  numOfBaths: number;
  rating: number;
}

export interface Cars {
  cars: Cars_cars[];
}
