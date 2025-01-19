import { Org, Prisma } from '@prisma/client'
import { OrgsRepository } from '../orgs-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = []

  async searchOrgByParams(
    name: string,
    phone: string,
    email: string,
  ): Promise<Org[]> {
    const orgs = this.items.filter((org) => {
      const matchesName = name ? org.name === name : true
      const matchesPhone = phone ? org.phone === phone : true
      const matchesEmail = email ? org.email === email : true

      const matchesOptionalCriteria =
        name || phone || email
          ? matchesName || matchesPhone || matchesEmail
          : true

      return matchesOptionalCriteria
    })

    return orgs
  }

  async searchOrgs(): Promise<Org[]> {
    const orgs = this.items

    return orgs
  }

  async searchOrgById(id: string): Promise<Org | null> {
    const org = this.items.find((item) => item.id === id)

    if (!org) {
      return null
    }

    return org
  }

  async create(data: Prisma.OrgUncheckedCreateInput): Promise<Org> {
    const org = {
      id: data.id ?? randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      phone: data.phone,
      cep: data.cep,
      state: data.state,
      city: data.city,
      neighborhood: data.neighborhood,
      street: data.street,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
    }

    this.items.push(org)

    return org
  }
}
