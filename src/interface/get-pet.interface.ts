import { Pets } from '@prisma/client'

export interface GetPetRequest {
  city?: string;
  type?: string;
  raca?: string;
  idade?: string;
  size?: string;
}

export interface GetPetResponse {
  pet: Pets[]
}