import { Ongs } from '@prisma/client'

export interface GetProfileRequest{
  userId: string
}

export interface GetProfileResponse {
user: Ongs
}