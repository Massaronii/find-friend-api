import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { PetDontDeleteError } from '../error/pet-dont-delete-error'

interface DeleteUseCaseResponse {
  pet: Pet
}

export class DeletePet {
  constructor(private petsRepository: PetsRepository) {}

  async execute(id: string): Promise<DeleteUseCaseResponse> {
    const pet = await this.petsRepository.deleteById(id)

    if (!pet) {
      throw new PetDontDeleteError()
    }

    return {
      pet,
    }
  }
}
