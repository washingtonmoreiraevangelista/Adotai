import { ResourceNotFoundError } from '@/error/resource-not-found.error'
import { GetProfileRequest, GetProfileResponse } from '@/interface/get-ongs.interface'
import { OngsRepository } from '@/repository/ongs.repository'

export class GetProfile {

  constructor(
    private userOngsRepository: OngsRepository
  ) { }

  async execute({ userId }: GetProfileRequest): Promise<GetProfileResponse> {
    const user = await this.userOngsRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return {
      user,
    }

  }

}