import { ResourceNotFoundError } from '@/error/resource-not-found.error'
import { Pets } from '@/interface/register-pets.interface'
import { OngsRepository } from '@/repository/ongs.repository'
import { PetRepository } from '@/repository/pet.repository'

export class RegisterPet {

  constructor(

    private registerPest: PetRepository,
    private userOngsRepository: OngsRepository

  ) { }

  async create({ name, raca, city, description, idade, size, type, ongId }: Pets) {

    const ongs = await this.userOngsRepository.findById(ongId)

    if (!ongs) {
      return new ResourceNotFoundError()
    }

    const pest = await this.registerPest.create({
      type,
      description,
      city: city.toLowerCase().replace(/\s/g, ''),
      idade,
      name,
      raca,
      size,
      ong: {
        connect: { id: ongId }
      }
    })

    return { pest }

  }
}