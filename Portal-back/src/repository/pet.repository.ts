import { prisma } from '@/libs/prisma'
import { Prisma } from '@prisma/client'

export class PetRepository {

  async create(data: Prisma.PetsCreateInput) {
    const pets = await prisma.pets.create({ data })

    return pets
  }

  async findAllPets( page: number, limit: number) {
    const pets = await prisma.pets.findMany({
      skip: (page - 1) * limit,
      take: limit
    })
    const total = await prisma.pets.count()

    return { pets, total, page, limit }
  }

// async findPets(filters: any, page: number, limit: number) {
//   const skip = (page - 1) * limit

//   const pets = await prisma.pets.findMany({
//     where: filters, 
//     skip,      
//     take: limit,    
//   })

//   const total = await prisma.pets.count({
//     where: filters,
//   })

//   return { pets, total }
// }


  async findByPetId(id: string) {
    const pet = await prisma.pets.findUnique({
      where: {
        id
      }
    }) 
    return pet
  }

  async updatePet(id: string, adopted: boolean) {

    const updatedPet  = await prisma.pets.update({
      where: {
        id
      },
      data: {
        adopted
      }
    })

    return updatedPet
  }

}