import { OrgsRepository } from '@/repositories/orgs-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { OrgDontExistsError } from '../error/org-dont-exists-error'

interface CreatePetUseCaseRequest {
  name: string
  age: number
  breed: string
  size: string
  height: number
  city: string
  org_id: string
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePet {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
  ) {}

  async execute({
    name,
    age,
    breed,
    size,
    height,
    city,
    org_id,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const org = await this.orgsRepository.searchOrgById(org_id)

    if (!org) {
      throw new OrgDontExistsError()
    }

    const pet = await this.petsRepository.create({
      name,
      age,
      breed,
      size,
      height,
      city,
      org_id,
    })

    return {
      pet,
    }
  }
}
