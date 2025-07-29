import { PetRepository } from '@/repository/pet.repository'

export class GetPetByIdService {
  constructor(
      private petRepository = new PetRepository
  ) { }

   async execute (id: string) {

    const pet = await this.petRepository.findById(id)

    return {
      pet
    }
   }
}