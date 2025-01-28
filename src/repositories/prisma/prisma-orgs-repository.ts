import { Org, Prisma } from '@prisma/client'
import { prisma } from '../../utils/lib/prisma'
import { FindManyNearbyParams, OrgsRepository } from '../orgs-repository'

export class PrismaOrgsRepository implements OrgsRepository {
  async findManyNearby({ latitude, longitude }: FindManyNearbyParams) {
    const gyms = await prisma.$queryRaw<Org[]>`
    SELECT * from orgs
    WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
  `

    if (gyms.length === 0) {
      return null
    }

    return gyms
  }

  searchOrgsByEmail(email: string) {
    const orgs = prisma.org.findUnique({
      where: {
        email,
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
