import { makeAuthenticateOrgUseCase } from '@/use-cases/factories/orgs/make-authenticateOrg-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticateOrg(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const schemaAuthenticateOrg = z.object({
    email: z.string().email(),
    password: z.string().min(2).max(20),
  })

  const { email, password } = schemaAuthenticateOrg.parse(request.body)

  const useCase = makeAuthenticateOrgUseCase()

  const org = await useCase.execute({
    email,
    password,
  })

  reply.status(200).send(org)
}
