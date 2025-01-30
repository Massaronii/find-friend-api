import { makeSearchOrgsByIdUseCase } from '@/use-cases/factories/orgs/make-searchOrgsById-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function searchOrgById(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const searchOrgByIdParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = searchOrgByIdParamsSchema.parse(request.params)

  const useCase = makeSearchOrgsByIdUseCase()

  const org = await useCase.execute(id)

  reply.status(200).send(org)
}
