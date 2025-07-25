import { UserOngsRepository } from '@/repository/userOngs.repository'
import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    phone: z.string(),
    email: z.string().email(),
    password_hash: z.string().min(6),
    address: z.string(),
  })

  const { name, phone, email, password_hash, address } = registerBodySchema.parse(request.body)

  try {

    const service = new UserOngsRepository()

    await service.create({
      name,
      phone,
      email,
      password_hash,
      address
    })

  } catch (error) {

    if (error instanceof Error) {
      return reply.status(409).send({ message: error.message })
    }

    throw error

  }

  return reply.status(201).send

}