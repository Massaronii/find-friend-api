import { Org, Prisma } from '@prisma/client'
import { prisma } from '../../utils/lib/prisma'
import { OrgsRepository } from '../orgs-repository'

export class PrismaOrgsRepository implements OrgsRepository {
  async searchOrgs(): Promise<Org[] | null> {
    const orgs = prisma.org.findMany()

    return orgs
  }

  async searchOrgById(id: string): Promise<Org | null> {
    const org = prisma.org.findUnique({
      where: {
        id,
      },
    })

    return org
  }

  async create(data: Prisma.OrgUncheckedCreateInput): Promise<Org> {
    const org = prisma.org.create({
      data,
    })

    return org
  }
}
