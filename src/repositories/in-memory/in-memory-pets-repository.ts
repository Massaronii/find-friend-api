import { Prisma, Pet } from '@prisma/client'
import { FindByParams, PetsRepository } from '../pets-repository'
import { randomUUID } from 'node:crypto'
export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = {
      id: randomUUID(),
      name: data.name,
      age: data.age,
      breed: data.breed,
      size: data.size,
      height: data.height,
      city: data.city,
      org_id: data.org_id,
    }

    this.items.push(pet)

    return pet
  }

  async findByParams(params: FindByParams): Promise<Pet[] | null> {
    const { city, id, org_id, name, height, age, breed, size, page } = params

    const pets = this.items.filter((pet) => {
      const matchesCity = pet.city === city
      const matchesHeight = height ? pet.height === height : true
      const matchesAge = age ? pet.age === age : true
      const matchesBreed = breed ? pet.breed === breed : true
      const matchesSize = size ? pet.size === size : true
      const matchesName = name ? pet.name === name : true
      const matchesId = id ? pet.id === id : true
      const matchesOrgId = org_id ? pet.org_id === org_id : true

      if (!matchesCity) {
        return []
      }

      const matchesOptionalCriteria =
        height || age || breed || size || name || id || org_id
          ? matchesHeight ||
            matchesAge ||
            matchesBreed ||
            matchesSize ||
            matchesName ||
            matchesId ||
            matchesOrgId
          : true

      return matchesCity && matchesOptionalCriteria
    })

    if (pets.length === 0) {
      return null
    }

    const pages = page || 1

    return pets.slice((pages - 1) * 20, pages * 20)
  }

  async deleteById(id: string): Promise<Pet | null> {
    const pet = this.items.find((item) => item.id === id)

    if (!pet) {
      return null
    }

    this.items.splice(this.items.indexOf(pet), 1)

    return pet
  }
}
