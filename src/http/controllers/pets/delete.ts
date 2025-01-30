import { makeDeletePetUseCase } from '@/use-cases/factories/pets/make-deletePet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function deletePet(request: FastifyRequest, reply: FastifyReply) {
  const schemaDeletePet = z.object({
    id: z.string().uuid(),
  })

  const { id } = schemaDeletePet.parse(request.body)
  console.log(id)
  const useCase = makeDeletePetUseCase()

  const { pet } = await useCase.execute(id)

  if (!pet) {
    reply.status(400).send('Pet not deleted')
  }

  reply.status(200).send()
}
