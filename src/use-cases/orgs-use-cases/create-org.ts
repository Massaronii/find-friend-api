import bcrypt from 'bcryptjs'
import { OrgsRepository } from '@/repositories/orgs-repository'
import { Org } from '@prisma/client'
import { OrgAlreadyExistsError } from '../error/org-already-exists-error'

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
    const existOrgWithSameNameOrEmailOrPhone =
      await this.orgsRepository.searchOrgsByEmail(email)

    const password = await bcrypt.hash(password_hash, 10)

    if (existOrgWithSameNameOrEmailOrPhone) {
      throw new OrgAlreadyExistsError()
    }

    const org = await this.orgsRepository.create({
      name,
      email,
      password_hash: password,
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
