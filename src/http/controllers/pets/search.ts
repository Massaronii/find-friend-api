import { makePetByParamsUseCase } from '@/use-cases/factories/pets/make-petByParams'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function searchPets(request: FastifyRequest, reply: FastifyReply) {
  const schemaSearchPets = z.object({
    city: z.string().min(3).max(50),
    name: z.string().min(3).max(50).optional(),
    age: z
      .number()
      .refine((value) => {
        return Math.abs(value) <= 30
      })
      .optional(),
    breed: z.string().min(3).max(50).optional(),
    size: z.string().min(3).max(50).optional(),
    height: z
      .number()
      .refine((value) => {
        return Math.abs(value) <= 100
      })
      .optional(),
    org_id: z.string().uuid().optional(),
    page: z.number().default(1).optional(),
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
