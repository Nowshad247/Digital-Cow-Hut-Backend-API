import { Types } from 'mongoose'

type ICowLocation =
  | 'Dhaka'
  | 'Chattogram'
  | 'Barishal'
  | 'Rajshahi'
  | 'Sylhet'
  | 'Comilla'
  | 'Rangpur'
  | 'Mymensingh'
type ICowBreed =
  | 'Brahman'
  | 'Nellore'
  | 'Sahiwal'
  | 'Gir'
  | 'Indigenous'
  | 'Tharparkar'
  | 'Kankrej'

type ICowLabel = 'sale' | 'sold out'
type ICowCategory = 'Dairy' | 'Beef' | 'Dual Purpose'

export type ICow = {
  name: string
  age: number
  price: number
  location: ICowLocation
  breed: ICowBreed
  weight: number
  label: ICowLabel
  category: ICowCategory
  seller: Types.ObjectId
}
