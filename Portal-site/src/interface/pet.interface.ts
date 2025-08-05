export interface Pet {
  id?: string
  name?: string
  description?: string
  type?: string
  raca?: string
  idade?: string
  size?: string
  city?: string
  adopted?: boolean
   photoUrl?: string
  org?: {
    phoneNumber: string
    name?: string
  }
}
