import { Ongs } from '@prisma/client'

export interface AuthenticateRequest {
  email: string
  password: string
}

export interface AuthenticateResponse {
  ong: Ongs
}