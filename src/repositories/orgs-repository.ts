import { Org, Prisma } from '@prisma/client'

export interface OrgsRepository {
  getOrgs(): Promise<Org[] | null>

  getOrgById(id: string): Promise<Org | null>

  create(data: Prisma.OrgUncheckedCreateInput): Promise<Org>
}
