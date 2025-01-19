import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository"
import { FetchOrgs } from "../orgs-use-cases/search-orgs"

export function makeGetOrgsUseCase() {
  const orgsRepository = new InMemoryOrgsRepository()
  const useCase = new FetchOrgs(orgsRepository)

  return useCase
}