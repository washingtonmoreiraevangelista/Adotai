import { prisma } from '@/libs/prisma'
import { Prisma } from '@prisma/client'

export class OngsRepository{

  async create(data: Prisma.OngsCreateInput) {
    const ongs = await prisma.ongs.create({data})

    return ongs
  }

  async findByEmail(email: string) {
    const ong = await prisma.ongs.findUnique({
      where: {
        email,
      }
    })

    return ong
  }

  async findById(id: string) {
    const ong = await prisma.ongs.findUnique({
      where:{
        id
      }
    })

    return ong
  }



}