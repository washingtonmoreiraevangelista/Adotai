import { prisma } from '@/libs/prisma'
import { Prisma } from '@prisma/client'

export class UserOngsRepository{

  async create(data: Prisma.OngsCreateInput) {
    const ongs = await prisma.ongs.create({data})

    return ongs
  }

  async findByEmail(email: string) {
    const ong = await prisma.ongs.findFirst({
      where: {
        email
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