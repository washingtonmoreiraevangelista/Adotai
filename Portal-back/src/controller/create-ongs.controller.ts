import {OngsRepository } from '@/repository/ongs.repository'
import { CreateOngsUseCase } from '@/services/create-ongs.service'
import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    phone: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    address: z.string(),
    city: z.string()
  })

  const { name, phone, email, password, address, city } = registerBodySchema.parse(request.body)

  try {

    const userRepository = new OngsRepository()
    const createOngsUseCase = new CreateOngsUseCase(userRepository)

    await createOngsUseCase.create({
      name,
      address,
      city,
      email,
      password,
      phone
    })

  } catch (error) {

    if (error instanceof Error) {
      return reply.status(409).send({ message: error.message })
    }

    throw error

  }

  return reply.status(201).send()

}