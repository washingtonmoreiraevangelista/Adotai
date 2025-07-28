import { authenticate } from '@/controller/authenticate.controller'
import { register } from '@/controller/createOngs.controller'
import { listPetsByCity } from '@/controller/get-pet.controller'
import { getProfile } from '@/controller/profile.controller'
import { registerPet } from '@/controller/register-pets.controller'
import { verifyJwt } from '@/middlewares/verify-jwt'
import { verifyRole } from '@/middlewares/verify-ongs-role'
import { FastifyInstance } from 'fastify'

export async function routes(app: FastifyInstance) {

  app.post('/register', register)
  app.get('/profile', getProfile)
  app.post('/sessions', authenticate)

  // Pets
  app.post('/pets/register', { onRequest: [verifyJwt, verifyRole('ADMIN')]}, registerPet)
  app.get('/pets', { onRequest: [verifyJwt, verifyRole('ADMIN')]}, listPetsByCity)

}