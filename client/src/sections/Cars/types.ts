interface Car {
  id: string
  ttle: string
  image: string
  price: number
  numOfGuests: number
  numOfBaths: number
  rating: number
}

export interface CarsData {
  cars: Car[]
}
