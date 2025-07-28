import { prisma } from '@/libs/prisma'
import { Prisma } from '@prisma/client'

export class PetRepository {

  async create(data: Prisma.PetsCreateInput) {
    const pets = await prisma.pets.create({ data })

    return pets
  }

  async findByCity() {
    const pet = await prisma.pets.findMany()

    return pet
  }
  async findByid(id: string) {
    const pet = await prisma.pets.findUnique({
      where: {
        id
      }
    })
  }


}