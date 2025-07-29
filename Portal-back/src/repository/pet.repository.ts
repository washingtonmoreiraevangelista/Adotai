import { prisma } from '@/libs/prisma'
import { Prisma } from '@prisma/client'

export class PetRepository {

  async create(data: Prisma.PetsCreateInput) {
    const pets = await prisma.pets.create({ data })

    return pets
  }

  async findByDescription() {
    const pet = await prisma.pets.findMany()

    return pet
  }

  async findById(id: string) {
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