import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { Org } from '@prisma/client'

interface CreateOrgUseCaseRequest {
  name: string
  email: string
  password_hash: string
  phone: string
  cep: string
  state: string
  city: string
  neighborhood: string
  street: string
  latitude: number
  longitude: number
}

export class CreateOrg {
  constructor(private orgsRepository: InMemoryOrgsRepository) {}

  async execute({
    name,
    email,
    password_hash,
    phone,
    cep,
    state,
    city,
    neighborhood,
    street,
    latitude,
    longitude,
  }: CreateOrgUseCaseRequest): Promise<Org> {
    const org  = await this.orgsRepository.create({
      name,
      email,
      password_hash,
      phone,
      cep,
      state,
      city,
      neighborhood,
      street,
      latitude,
      longitude,
    })

    return {
        ...org,
    }
  }
}
