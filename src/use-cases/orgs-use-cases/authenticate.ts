import bcrypt from 'bcryptjs'
import { Org } from '@prisma/client'
import { OrgsRepository } from '@/repositories/orgs-repository'
import { InvalidCredencialsError } from '../error/invalid-credencials.error'
import { OrgDontExistsError } from '../error/org-dont-exists-error'

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
    const org = await this.orgsRepository.searchOrgByParams(email)

    if (!org || org.length === 0) {
      throw new OrgDontExistsError()
    }

    const doesPasswordMatch = await bcrypt.compare(
      password,
      org[0].password_hash,
    )

    if (!doesPasswordMatch) {
      throw new InvalidCredencialsError()
    }

    return {
      org: org[0],
    }
  }
}
