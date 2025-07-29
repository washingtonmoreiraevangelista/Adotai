import { FastifyReply, FastifyRequest } from 'fastify'

export function verifyRole(roleToVerify: 'ADMIN' | "MEMBER") {
  return async (request: FastifyRequest, reply: FastifyReply) => {
     console.log('Decoded user from token:', request.user)
    const { role } = request.user

    if (role !== roleToVerify) {
      return reply.status(401).send({ message: 'Unauthorized ' })
    }
  }
}