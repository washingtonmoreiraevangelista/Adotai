import { PetRepository } from '@/repository/pet.repository'
import { ListByPets } from '@/services/get-Pet-descrition.service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'


export async function listByPets(request: FastifyRequest, reply: FastifyReply) {
  const querySchema = z.object({
    city: z.string().optional(),
    type: z.string().optional(),
    raca: z.string().optional(),
    idade: z.string().optional(),
    size: z.string().optional(),
  })

  const filters = querySchema.parse(request.query)

  const registerPetRepository = new PetRepository()
  const petService = new ListByPets(registerPetRepository)

  const { pet } = await petService.execute(filters)

  return reply.status(200).send({ pet })
}