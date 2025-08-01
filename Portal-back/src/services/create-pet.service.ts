import { ResourceNotFoundError } from '@/error/resource-not-found.error'
import { Pet } from '@/interface/register-pets.interface'
import { OngsRepository } from '@/repository/ongs.repository'
import { PetRepository } from '@/repository/pet.repository'
import { PetType } from '@prisma/client'

export class RegisterPet {

  constructor(

    private registerPest: PetRepository,
    private userOngsRepository: OngsRepository

  ) { }

  async create(data: Pet) {

    const ongs = await this.userOngsRepository.findById(data.ongId)

    if (!ongs) {
      return new ResourceNotFoundError()
    }

    const pest = await this.registerPest.create({
      name: data.name,
      description: data.description,
      type: data.type as PetType,
      city: data.city.toLowerCase().replace(/\s/g, ''),
      age: data.age,
      raca: data.raca,
      size: data.size,
      adopted: false,
      photoUrl: data.photoUrl,
      created_At: new Date(),
      ong: {
        connect: { id: data.ongId }
      }
    })

    return { pest }

  }
}