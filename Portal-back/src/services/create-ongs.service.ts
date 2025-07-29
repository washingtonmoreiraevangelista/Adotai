import { UserError } from '@/error/user.error'
import { Ongs } from '@/interface/ongs.interface'
import { OngsRepository } from '@/repository/ongs.repository'
import { hash } from 'bcryptjs'

export class CreateOngsUseCase {

  constructor(
    private createOngsRepository: OngsRepository
  ) { }

  async create({ name, email, phone, address, password, city }: Ongs) {

    const passwordHashed = await hash(password, 6)

    const userWithSameEmail = await this.createOngsRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserError()
    }

    const ongs = await this.createOngsRepository.create({
      name,
      email,
      address,
      password_hash: passwordHashed,
      phone,
      city
    })

    return { ongs }

  }
}
