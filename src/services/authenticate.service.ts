import { InvalidCredentialError } from '@/error/invalide-credential.error'
import { AuthenticateRequest, AuthenticateResponse } from '@/interface/authneticate.interface'
import { UserOngsRepository } from '@/repository/userOngs.repository'
import { compare } from 'bcryptjs'

export class AuthenticateService {
  constructor(
    private userOngsRepository: UserOngsRepository
  ) { }

  async execute({ email, password }: AuthenticateRequest): Promise<AuthenticateResponse> {

    const ong = await this.userOngsRepository.findByEmail(email)

    if (!ong) {
      throw new InvalidCredentialError()
    }

    const hasPassworValid = await compare(password, ong.password_hash)

    if (!hasPassworValid) {
      throw new InvalidCredentialError()
    }

    return { ong }
  }

}