import { makeCreateOrgsUseCase } from '@/use-cases/factories/orgs/make-createOrgs-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createOrg(request: FastifyRequest, reply: FastifyReply) {
  const createOrgParamsSchema = z.object({
    name: z.string().min(3).max(50),
    phone: z.string().min(9).max(11),
    email: z.string().email(),
    password_hash: z.string().min(2).max(20),
    cep: z.string().min(8).max(8),
    state: z.string().min(2).max(30),
    city: z.string().min(2).max(30),
    neighborhood: z.string().min(2).max(30),
    street: z.string().min(2).max(30),
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const {
    name,
    phone,
    email,
    password_hash,
    cep,
    state,
    city,
    neighborhood,
    street,
    latitude,
    longitude,
  } = createOrgParamsSchema.parse(request.body)

  const useCase = makeCreateOrgsUseCase()

  await useCase.execute({
    name,
    email,
    password_hash,
    phone,
    cep,
    state,
    city,
    neighborhood,
    street,
    latitude,
    longitude,
  })

  reply.status(201).send()
}
