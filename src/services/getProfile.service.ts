import { ResourceNotFoundError } from '@/error/resource-not-found.error'
import { GetProfileRequest, GetProfileResponse } from '@/interface/getOngs.interface'
import { UserOngsRepository } from '@/repository/userOngs.repository'

export class GetProfile {

  constructor(
    private userOngsRepository: UserOngsRepository
  ) { }

  async execute({ userId }: GetProfileRequest): Promise<GetProfileResponse> {
    const user = await this.userOngsRepository.findById(userId)

    if(!user) {
       throw new ResourceNotFoundError()
    }

    return {
      user,
    }

  }

}