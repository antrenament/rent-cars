export interface Car {
  id: string
  title: string
  image: string
  price: number
  numOfGuests: number
  numOfBaths: number
  rating: number
}

export interface CarsData {
  cars: Car[]
}

export interface DeleteCar {
  deleteCar: Car
}

export interface DeleteCarVariables {
  id: string
}
