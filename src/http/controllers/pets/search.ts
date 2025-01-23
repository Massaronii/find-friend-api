import { makePetByParamsUseCase } from '@/use-cases/factories/pets/make-petByParams'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function searchPets(request: FastifyRequest, reply: FastifyReply) {
  const schemaSearchPets = z.object({
    city: z.string().min(3).max(50),
    name: z.string().min(3).max(50),
    age: z.number().refine((value) => {
      return Math.abs(value) <= 30
    }),
    breed: z.string().min(3).max(50),
    size: z.string().min(3).max(50),
    height: z.number().refine((value) => {
      return Math.abs(value) <= 100
    }),
    org_id: z.string().uuid(),
    page: z.number().default(1),
  })

  const { name, age, breed, size, height, city, org_id, page } =
    schemaSearchPets.parse(request.query)

  const useCase = makePetByParamsUseCase()

  const pets = await useCase.execute({
    name,
    age,
    breed,
    size,
    height,
    city,
    org_id,
    page,
  })

  reply.status(200).send(pets)
}
