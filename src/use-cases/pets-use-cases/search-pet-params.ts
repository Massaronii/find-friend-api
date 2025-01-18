import {
  FindByAnotherParams,
  PetsRepository,
} from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { PetDontSearchError } from '../error/pet-dont-search-error'

type SearchPetByParamsResponse = Pet[]

export class SearchPetByParams {
  constructor(private petsRepository: PetsRepository) {}

  async execute(
    params: FindByAnotherParams,
    page: number,
  ): Promise<SearchPetByParamsResponse> {
    const pets = await this.petsRepository.findByParams(
      {
        ...params,
      },
      page,
    )

    if (!pets) {
      throw new PetDontSearchError()
    }

    return pets
  }
}
