import { Pets } from '@prisma/client'

export interface GetPetRequest {
  city?: string
  type?: string
  raca?: string
  age?: string
  size?: string
  search?: string
  page: number
  limit: number
  ongId?: string
}

export interface GetPetResponse {
  pet: Pets[] 
  total: number
  page: number
  limit: number
}