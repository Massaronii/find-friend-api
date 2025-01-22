import { Prisma } from '@prisma/client'
import { prisma } from '../../utils/lib/prisma'
import { OrgsRepository } from '../orgs-repository'

export class PrismaOrgsRepository implements OrgsRepository {
  searchOrgByParams(name: string, phone: string, email: string) {
    const orgs = prisma.org.findMany({
      where: {
        ...(name && { name }),
        ...(phone && { phone }),
        ...(email && { email }),
      },
    })

    return orgs
  }

  async searchOrgs() {
    const orgs = prisma.org.findMany()

    return orgs
  }

  async searchOrgById(id: string) {
    const org = prisma.org.findUnique({
      where: {
        id,
      },
    })

    return org
  }

  async create(data: Prisma.OrgUncheckedCreateInput) {
    const org = prisma.org.create({
      data,
    })

    return org
  }
}
