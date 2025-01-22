import { makeCreatePetUseCase } from '@/use-cases/factories/pets/make-createPet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createPet(request: FastifyRequest, reply: FastifyReply) {
  const schemaCreatePet = z.object({
    name: z.string().min(1).max(50),
    age: z.number().refine((value) => {
      return Math.abs(value) <= 30
    }),
    breed: z.string().min(3).max(50),
    size: z.string().min(3).max(50),
    height: z.number().refine((value) => {
      return Math.abs(value) <= 100
    }),
    city: z.string().min(3).max(50),
    org_id: z.string().uuid(),
  })

  const { name, age, breed, size, height, city, org_id } =
    schemaCreatePet.parse(request.body)

  const useCase = makeCreatePetUseCase()

  const { pet } = await useCase.execute({
    name,
    age,
    breed,
    size,
    height,
    city,
    org_id,
  })

  if (!pet) {
    reply.status(400).send('Pet not created')
  }

  reply.status(201).send()
}
