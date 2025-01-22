import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { SearchOrgById } from '../../orgs-use-cases/search-org-by-id'

export function makeSearchOrgsByIdUseCase() {
  const prismaOrgsRepository = new PrismaOrgsRepository()
  const useCase = new SearchOrgById(prismaOrgsRepository)

  return useCase
}
