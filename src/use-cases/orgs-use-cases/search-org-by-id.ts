import { OrgsRepository } from "@/repositories/orgs-repository";

export class SearchOrgById {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute(id: string) {
    const org = await this.orgsRepository.searchOrgById(id)

    return null

  }
}