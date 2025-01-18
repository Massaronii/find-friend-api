import { FindByAnotherParams, PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";

export class SearchPetByParams {
    constructor(private petsRepository: PetsRepository) {}

    async execute(params: FindByAnotherParams, page: number):Promise<Pet[] | null> {
        const pets = await this.petsRepository.findByParams({
            ...params,
        }, page)

        if(!pets) return null

        return pets
    }
}