export type PetType = 'DOG' | 'CAT' | 'BIRD' | 'OTHER'
export type PetSize = 'SMALL' | 'MEDIUM' | 'LARGE'

export interface Pet {
  name: string
  description: string
  type: PetType
  raca: string
  age: string
  city: string
  size: PetSize
  adopted: boolean
  created_At: string 
  photoUrl: string
  ongId: string
}
