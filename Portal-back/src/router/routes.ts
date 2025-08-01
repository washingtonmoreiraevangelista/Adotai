import { authenticate } from '@/controller/authenticate.controller'
import { register } from '@/controller/create-ongs.controller'
import { getAllPets, getPet, registerPet, updatePet } from '@/controller/pet.controller'
import { getProfile } from '@/controller/profile.controller'
import { refresh } from '@/controller/reflesh.controller'
import { verifyJwt } from '@/middlewares/verify-jwt'
import { verifyRole } from '@/middlewares/verify-ongs-role'
import { FastifyInstance } from 'fastify'

export async function routes(app: FastifyInstance) {

  app.patch('/token/refresh', refresh)
  app.post('/register', register)
  app.get('/profile', getProfile)
  app.post('/sessions', authenticate)

  // Pets
  app.get('/pet/:id', getPet)
  app.get('/pet/all', getAllPets)
  // app.get('/pet', listByPets)
  app.post('/pet/register', { onRequest: [verifyJwt, verifyRole('ADMIN')] }, registerPet)
  app.patch('/pet/:id', { onRequest: [verifyJwt, verifyRole('ADMIN')] }, updatePet)


}