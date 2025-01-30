import { Org, Prisma } from '@prisma/client'

export interface FindManyNearbyParams {
  latitude: number
  longitude: number
}

export interface OrgsRepository {
  searchOrgs(): Promise<Org[]>

  searchOrgById(id: string): Promise<Org | null>

  findManyNearby(params: FindManyNearbyParams): Promise<Org[] | null>

  create(data: Prisma.OrgUncheckedCreateInput): Promise<Org>
}
