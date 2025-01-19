import { Pet, Prisma } from '@prisma/client'

export interface FindByAnotherParams {
  id?: string
  name?: string
  city?: string
  height?: number
  age?: number
  breed?: string
  size?: string
  org_id?: string
}

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>

  findById(id: string): Promise<Pet | null>

  findByParams(
    findByCaracteristics: FindByAnotherParams,
    page: number,
  ): Promise<Pet[] | null>

  deleteById(id: string): Promise<Pet | null>
}
