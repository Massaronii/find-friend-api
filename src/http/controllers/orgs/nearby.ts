import { makeFetchNearbyOrgsUseCase } from '@/use-cases/factories/orgs/make-fetchNearbyOrgs-use-cases'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function nearbyOrgs(request: FastifyRequest, reply: FastifyReply) {
  const schemaNearbyOrgs = z.object({
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { latitude, longitude } = schemaNearbyOrgs.parse(request.query)

  const useCase = makeFetchNearbyOrgsUseCase()

  const orgs = await useCase.execute({ latitude, longitude })

  reply.status(200).send(orgs)
}
