import { Org, Prisma } from '@prisma/client'

export interface OrgsRepository {
  searchOrgs(): Promise<Org[] | null>

  searchOrgById(id: string): Promise<Org | null>

  create(data: Prisma.OrgUncheckedCreateInput): Promise<Org>
}
