import { PetsRepository } from '@/repositories/pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { DeletePet } from './delete-pet'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { PetDontDeleteError } from '../error/pet-dont-delete-error'

describe('delete pet', () => {
  let petsRepository: PetsRepository
  let sut: DeletePet
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new DeletePet(petsRepository)
  })

  it('should delete pet', async () => {
    const pet = await petsRepository.create({
      name: 'Pet 1',
      age: 1,
      breed: 'Dog',
      size: 'Medium',
      height: 1,
      city: 'Santos',
      org_id: '123',
    })

    const { pet: petDelete } = await sut.execute(pet.id)

    expect(petDelete).toEqual(expect.any(Object))
  })

  it('should dont delete pet', async () => {
    await petsRepository.create({
      name: 'Pet 1',
      age: 1,
      breed: 'Dog',
      size: 'Medium',
      height: 1,
      city: 'Santos',
      org_id: '123',
    })

    await expect(sut.execute('123')).rejects.toBeInstanceOf(PetDontDeleteError)
  })
})
