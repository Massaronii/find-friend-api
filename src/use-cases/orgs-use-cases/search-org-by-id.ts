import { OrgsRepository } from '@/repositories/orgs-repository'
import { OrgDontExistsError } from '../error/org-dont-exists-error'
import { Org } from '@prisma/client'

interface SearchOrgByIdResponse {
  org: Org
}

export class SearchOrgById {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute(id: string): Promise<SearchOrgByIdResponse> {
    const org = await this.orgsRepository.searchOrgById(id)

    if (!org) {
      throw new OrgDontExistsError()
    }

    return { org }
  }
}
