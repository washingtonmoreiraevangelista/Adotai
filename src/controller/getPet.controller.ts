import { PetRepository } from '@/repository/pet.repository'
import { GetPetByIdService } from '@/services/getPet.service'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function getPet(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string }

  const repository = new PetRepository()
  const service = new GetPetByIdService(repository)

  const { pet } = await service.execute(id)

  return reply.send({ pet })
  
}