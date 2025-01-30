import { FastifyInstance } from 'fastify'
import { searchPets } from './search'
import { createPet } from './create'
import { deletePet } from './delete'
import { verifyJwt } from '@/http/middlewares/verify-jwt'

export function petsRoutes(app: FastifyInstance) {
  app.get('/org/pets', searchPets)
  app.delete('/org/pet', { onRequest: [verifyJwt] }, deletePet)
  app.post('/org/pet', { onRequest: [verifyJwt] }, createPet)
}
