import { OngsRepository, PetRepository } from '@/repository'
import { GetPetByIdService, ListByPets, RegisterPet } from '@/services'
import { UpdateByPet } from '@/services/update-pet.service'
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

  const ongsRepository = new OngsRepository()
  const repository = new PetRepository()
  const service = new RegisterPet(repository,ongsRepository)

  await service.create({
    name,
    description,
    type,
    raca,
    idade,
    city,
    size,
    ongId
  })

  return reply.status(201).send()


}

export async function getPet(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string }

  const repository = new PetRepository()
  const service = new GetPetByIdService(repository)

  const { pet } = await service.execute(id)

  return reply.send( pet )

}

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

export async function updatePet(request: FastifyRequest, reply: FastifyReply) {

  const paramsSchema = z.object({
    id: z.string()
  })

  const bodySchema = z.object({
    adopted: z.boolean()
  })

  //passo o id via parans para buscar 
  const { id } = paramsSchema.parse(request.params)
  // adoted via body para atualizar
  const { adopted } = bodySchema.parse(request.body)

  const repository = new PetRepository()
  const service = new UpdateByPet(repository)

  const { pet } = await service.update(id, adopted)

  return reply.send(pet)

}

// quando atualizar algo passo o id via parans e o corpo da atualização via body