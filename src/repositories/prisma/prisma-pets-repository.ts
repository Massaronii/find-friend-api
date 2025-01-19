import { Prisma, Pet } from '@prisma/client'
import { FindByAnotherParams, PetsRepository } from '../pets-repository'
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

  async findByParams(
    findByCaracteristics: FindByAnotherParams,
    page: number,
  ): Promise<Pet[] | null> {
    const { city, height, age, breed, size } = findByCaracteristics

    const pets = prisma.pet.findMany({
      where: {
        city,
        ...(height && { height }),
        ...(age && { age }),
        ...(breed && { breed }),
        ...(size && { size }),
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return pets
  }
}
