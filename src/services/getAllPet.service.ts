import { ResourceNotFoundError } from '@/error/resource-not-found.error'
import { GetPetRequest, GetPetResponse } from '@/interface/get-pet.interface'
import { PetRepository } from '@/repository/pet.repository'
import { normalize } from '@/utils/normalize'

export class ListPetsByCity {
  constructor(
    private registerPetRepository: PetRepository

  ) { }

  async execute(filters: GetPetRequest): Promise<GetPetResponse> {

    const allPets = await this.registerPetRepository.findByCity()

    const filteredPets = allPets.filter(pet => {
      const matchCity = filters.city ? normalize(pet.city) === normalize(filters.city) : true
      const matchType = filters.type ? pet.type === filters.type : true
      const matchRaca = filters.raca ? pet.raca === filters.raca : true
      const matchIdade = filters.idade ? pet.idade === filters.idade : true
      const matchSize = filters.size ? pet.size === filters.size : true
      const matchAvailable = pet.adopted === false

      return matchCity && matchType && matchRaca && matchIdade && matchSize && matchAvailable
    })


    if (filteredPets.length === 0) {
      throw new ResourceNotFoundError()
    }

    return {
      pet: filteredPets
    }
  }
}