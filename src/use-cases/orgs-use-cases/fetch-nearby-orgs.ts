import {
  FindManyNearbyParams,
  OrgsRepository,
} from '@/repositories/orgs-repository'
import { DontFetchNearbyOrgsError } from '../error/dont-fetch-nearby-orgs.error'

export class FetchNearbyOrgs {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({ latitude, longitude }: FindManyNearbyParams) {
    const orgs = await this.orgsRepository.findManyNearby({
      latitude,
      longitude,
    })

    if (!orgs || orgs.length === 0) {
      throw new DontFetchNearbyOrgsError()
    }

    return orgs
  }
}
