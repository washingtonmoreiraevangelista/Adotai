import { ResourceNotFoundError } from '@/error/resource-not-found.error'
import { PetRepository } from '@/repository/pet.repository'

export class GetPetByIdService {
  constructor(
      private petRepository = new PetRepository
  ) { }

   async execute (id: string) {

    const pet = await this.petRepository.findByid(id)

    return {
      pet
    }
   }
}