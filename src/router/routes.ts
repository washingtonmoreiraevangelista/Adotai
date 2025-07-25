import { register } from '@/controller/createOngs.controller'
import { getProfile } from '@/controller/profile.controller'
import { FastifyInstance } from 'fastify'

export async function routes(app: FastifyInstance) {

  app.post('/register', register)
  app.get('/profile', getProfile)
}