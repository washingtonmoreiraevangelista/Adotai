import { ResourceNotFoundError } from '@/error'
import { PetRepository } from '@/repository'

export class UpdateByPet {
  constructor(
    private petRepository: PetRepository
  ) { }

  async update(id: string, adopted: boolean) {

    const pet = await this.petRepository.updatePet(id, adopted)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    return {
      pet
    }
  }

}