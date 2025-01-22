import { makeFetchOrgsUseCase } from '@/use-cases/factories/orgs/make-fetchOrgs-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function fetchOrgs(request: FastifyRequest, reply: FastifyReply) {
  const useCase = makeFetchOrgsUseCase()

  const orgs = await useCase.execute()

  reply.status(200).send(orgs)
}
