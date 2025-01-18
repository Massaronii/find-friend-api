import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { Org } from "@prisma/client";

export class GetOrgs {
  constructor(private orgsRepository: InMemoryOrgsRepository) {}

  async execute(): Promise<Org[] | null> {

    const orgs = await this.orgsRepository.getOrgs()

    return null
  }
}