import { ResourceNotFoundError } from '@/error/resource-not-found.error'
import { GetPetRequest, GetPetResponse } from '@/interface/get-pet.interface'
import { PetRepository } from '@/repository/pet.repository'

export class ListAllPets {
  constructor(
    private registerPetRepository: PetRepository
  ) { }

  async execute(filters: GetPetRequest): Promise<GetPetResponse> {
    const page = filters.page || 1
    const limit = filters.limit || 12

    const { pets, total } = await this.registerPetRepository.findAllPets(page, limit)

    return {
      pet: pets,
      total,
      page,
      limit
    }
  }
}
