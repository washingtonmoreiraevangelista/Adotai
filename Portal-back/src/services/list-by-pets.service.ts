// import { ResourceNotFoundError } from '@/error/resource-not-found.error'
// import { GetPetRequest, GetPetResponse } from '@/interface/get-pet.interface'
// import { PetRepository } from '@/repository/pet.repository'
// import { normalize } from '@/utils/normalize'

// export class ListByPets {
//   constructor(
//     private registerPetRepository: PetRepository

//   ) { }

//   async execute(filters: GetPetRequest): Promise<GetPetResponse> {

//     const { pets, total } = await this.registerPetRepository.findPets(filters, filters.page, filters.limit)

//     const filteredPets = pets.filter(pet => {
//       const matchCity = filters.city ? normalize(pet.city) === normalize(filters.city) : true
//       const matchType = filters.type ? normalize(pet.type) === normalize(filters.type) : true
//       const matchRaca = filters.raca ? normalize(pet.raca) === normalize(filters.raca) : true
//       const matchIdade = filters.idade ? normalize(pet.idade) === normalize(filters.idade) : true
//       const matchSize = filters.size ? normalize(pet.size) === normalize(filters.size) : true
//       const matchAvailable = pet.adopted === false

//       return matchCity && matchType && matchRaca && matchIdade && matchSize && matchAvailable
//     })


//     if (filteredPets.length === 0) {
//       throw new ResourceNotFoundError()
//     }

//     return {
//       pet: filteredPets,
//       total,
//       page: filters.page,
//       limit: filters.limit,
//     }
//   }

// }