import { PetRepository } from '@/repository/pet.repository'
import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function registerPet(request: FastifyRequest, reply: FastifyReply) {
  const petsSchema = z.object({
    name: z.string(),
    description: z.string(),
    type: z.string(),
    raca: z.string(),
    idade: z.string(),
    city: z.string(),
    size: z.string(),
  })

  const { name, description, type, raca, idade, city, size } = await petsSchema.parse(request.body)

  const ongId = request.user.sub

  const registerPest = new PetRepository()


  await registerPest.create({
    name,
    description,
    type,
    raca,
    idade,
    city,
    size,
    ong: {
      connect: { id: ongId }
    }
  })

  return reply.status(201).send()


}