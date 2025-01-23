import { FindByParams, PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { PetDontSearchError } from '../error/pet-dont-search-error'

type SearchPetByParamsResponse = Pet[]

export class SearchPetByParams {
  constructor(private petsRepository: PetsRepository) {}

  async execute(params: FindByParams): Promise<SearchPetByParamsResponse> {
    const pets = await this.petsRepository.findByParams(params)

    if (!pets) {
      throw new PetDontSearchError()
    }

    return pets
  }
}
