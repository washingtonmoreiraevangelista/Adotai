import { InvalidCredentialError } from '@/error/invalide-credential.error'
import { UserOngsRepository } from '@/repository/userOngs.repository'
import { AuthenticateService } from '@/services/authenticate.service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  const autheticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
  })

  const { email, password } = autheticateBodySchema.parse(request.body)
  console.log('BODY RECEBIDO:', request.body)

  try {

    const userRepository = new UserOngsRepository()
    const authenticateService = new AuthenticateService(userRepository)

    const { ong } = await authenticateService.execute({
      email,
      password
    })

    const token = await reply.jwtSign(
      {
        role: ong.role
      },
      {
        sign: {
          sub: ong.id,
          expiresIn: '10m'
        },
      }
    )

    return reply.status(200).send({ token })

  } catch (error) {

    if (error instanceof InvalidCredentialError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error

  }


}