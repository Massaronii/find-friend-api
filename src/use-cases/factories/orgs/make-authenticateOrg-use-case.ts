import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { AuthenticateOrg } from '@/use-cases/orgs-use-cases/authenticate'

export function makeAuthenticateOrgUseCase() {
  const prismaOrgsRepository = new PrismaOrgsRepository()
  const useCase = new AuthenticateOrg(prismaOrgsRepository)

  return useCase
}
