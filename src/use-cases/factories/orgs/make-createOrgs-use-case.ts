import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { CreateOrg } from '../../orgs-use-cases/create-org'

export function makeCreateOrgsUseCase() {
  const prismaOrgsRepository = new PrismaOrgsRepository()
  const useCase = new CreateOrg(prismaOrgsRepository)

  return useCase
}
