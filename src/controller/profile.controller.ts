import { UserOngsRepository } from '@/repository/userOngs.repository'
import { GetProfile } from '@/services/getProfile.service'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function getProfile(request: FastifyRequest, reply: FastifyReply) {
  const userId = request.headers['x-user-id'] as string

  const userOngsRepository = new UserOngsRepository()
  const getProfile = new GetProfile(userOngsRepository)


  const { user } = await getProfile.execute({
    userId
  })

  return reply.status(200).send({
    user: {
      ...user,
      password: undefined
    }
  })

}