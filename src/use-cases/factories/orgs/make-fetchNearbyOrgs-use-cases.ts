import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { FetchNearbyOrgs } from '@/use-cases/orgs-use-cases/fetch-nearby-orgs'

export function makeFetchNearbyOrgsUseCase() {
  const prismaOrgsRepository = new PrismaOrgsRepository()
  const fetchNearbyOrgs = new FetchNearbyOrgs(prismaOrgsRepository)

  return fetchNearbyOrgs
}
