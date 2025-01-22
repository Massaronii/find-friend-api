import { OrgsRepository } from '@/repositories/orgs-repository'
import { Org } from '@prisma/client'
import { OrgDontExistsError } from '../error/org-dont-exists-error'

type FetchOrgsResponse = Org[]

export class FetchOrgs {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute(): Promise<FetchOrgsResponse> {
    const orgs = await this.orgsRepository.searchOrgs()

    if (!orgs || orgs.length === 0) {
      throw new OrgDontExistsError()
    }

    return orgs
  }
}
