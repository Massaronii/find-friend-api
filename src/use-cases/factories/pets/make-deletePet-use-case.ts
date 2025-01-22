import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { DeletePet } from '@/use-cases/pets-use-cases/delete-pet'

export function makeDeletePetUseCase() {
  const petsRepository = new PrismaPetsRepository()

  const useCase = new DeletePet(petsRepository)

  return useCase
}
