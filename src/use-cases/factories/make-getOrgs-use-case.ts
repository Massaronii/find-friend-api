import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository"
import { GetOrgs } from "../orgs-use-cases/get-orgs"

export function makeGetOrgsUseCase() {
  const orgsRepository = new InMemoryOrgsRepository()
  const useCase = new GetOrgs(orgsRepository)

  return useCase
}