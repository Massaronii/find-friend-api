import { Org, Prisma } from '@prisma/client'

export interface OrgsRepository {
  searchOrgs(): Promise<Org[]>

  searchOrgById(id: string): Promise<Org | null>

  searchOrgByParams(
    name: string,
    phone: string,
    email: string,
  ): Promise<Org[] | null>

  create(data: Prisma.OrgUncheckedCreateInput): Promise<Org>
}
