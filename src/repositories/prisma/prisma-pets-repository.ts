import { Prisma, Pet } from '@prisma/client'
import { FindByParams, PetsRepository } from '../pets-repository'
import { prisma } from '@/utils/lib/prisma'
export class PrismaPetsRepository implements PetsRepository {
  deleteById(id: string): Promise<Pet | null> {
    const pet = prisma.pet.delete({
      where: {
        id,
      },
    })

    return pet
  }

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = prisma.pet.create({
      data,
    })
    return pet
  }

  async findById(id: string): Promise<Pet | null> {
    const pet = prisma.pet.findUnique({
      where: {
        id,
      },
    })

    return pet
  }

  async findByParams(params: FindByParams): Promise<Pet[] | null> {
    const { city, id, org_id, name, height, age, breed, size, page } = params
    const pages = page || 1
    const pets = prisma.pet.findMany({
      where: {
        city,
        ...(name && { name }),
        ...(id && { id }),
        ...(org_id && { org_id }),
        ...(height && { height }),
        ...(age && { age }),
        ...(breed && { breed }),
        ...(size && { size }),
      },
      take: 20,
      skip: (pages - 1) * 20,
    })

    return pets
  }
}
