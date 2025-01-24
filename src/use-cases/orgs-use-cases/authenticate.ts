import bcrypt from 'bcryptjs'
import { Org } from '@prisma/client'
import { OrgsRepository } from '@/repositories/orgs-repository'
import { InvalidCredencialsError } from '../error/invalid-credencials.error'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  org: Org
}

export class AuthenticateOrg {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const org = await this.orgsRepository.searchOrgsByEmail(email)

    if (!org) {
      throw new InvalidCredencialsError()
    }

    const doesPasswordMatch = await bcrypt.compare(password, org.password_hash)

    if (!doesPasswordMatch) {
      throw new InvalidCredencialsError()
    }

    return {
      org,
    }
  }
}
