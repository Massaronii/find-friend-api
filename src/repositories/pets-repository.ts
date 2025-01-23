import { Pet, Prisma } from '@prisma/client'
export interface FindByParams {
  city?: string
  id?: string
  org_id?: string
  name?: string
  height?: number
  age?: number
  breed?: string
  size?: string
  page?: number
}
export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>

  findById(id: string): Promise<Pet | null>

  findByParams(params: FindByParams): Promise<Pet[] | null>

  deleteById(id: string): Promise<Pet | null>
}
