import { FastifyInstance } from 'fastify'
import { searchPets } from './search'
import { createPet } from './create'
import { deletePet } from './delete'

export function petsRoutes(app: FastifyInstance) {
  app.get('/pets', searchPets)
  app.delete('/pet/:id', deletePet)
  app.post('/pet', createPet)
}
