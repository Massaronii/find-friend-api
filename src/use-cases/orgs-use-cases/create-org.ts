import { OrgsRepository } from '@/repositories/orgs-repository'
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

interface CreateOrgUseCaseResponse {
  org: Org
}

export class CreateOrg {
  constructor(private orgsRepository: OrgsRepository) {}

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
  }: CreateOrgUseCaseRequest): Promise<CreateOrgUseCaseResponse> {
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
        org,
    }
  }
}
