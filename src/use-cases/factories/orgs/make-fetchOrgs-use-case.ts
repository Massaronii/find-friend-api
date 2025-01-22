import { FetchOrgs } from '../../orgs-use-cases/fetch-orgs'
import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'

export function makeFetchOrgsUseCase() {
  const orgsRepository = new PrismaOrgsRepository()
  const useCase = new FetchOrgs(orgsRepository)

  return useCase
}
