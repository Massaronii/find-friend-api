import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { SearchPetByParams } from '@/use-cases/pets-use-cases/search-pet-params'

export function makePetByParamsUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const useCase = new SearchPetByParams(petsRepository)

  return useCase
}
