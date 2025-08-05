import { OngsRepository } from '@/repository/ongs.repository'
import { GetProfile } from '@/services/get-profile.service'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function getProfile(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string }

  const userOngsRepository = new OngsRepository()
  const getProfile = new GetProfile(userOngsRepository)

  const { user } = await getProfile.execute({ userId: id })

  return reply.status(200).send({
    user: {
      ...user,
      password: undefined
    }
  })
}
