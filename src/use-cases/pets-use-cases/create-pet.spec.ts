import { PetsRepository } from "@/repositories/pets-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreatePet } from "./create-pet";
import { OrgsRepository } from "@/repositories/orgs-repository";
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { OrgAlreadyExistsError } from "../error/org-already-exists-error";

describe("create pet use case", () => {
    let petsRepository: PetsRepository
    let orgsRepository: OrgsRepository
    let sut: CreatePet
    beforeEach(() => {
        petsRepository = new InMemoryPetsRepository()
        orgsRepository = new InMemoryOrgsRepository()
        sut = new CreatePet(petsRepository, orgsRepository)
    })

    it("should create a pet", async () => {
        const org = await orgsRepository.create({
            name: "Org 1",
            email: "org1@example.com",
            password_hash: "password_hash",
            phone: "+551199999999",
            cep: "12345678",
            state: "SP",
            city: "Santos",
            neighborhood: "Vila Madalena",
            street: "Rua do limoeiro",
            latitude: -23.5505,
            longitude: -46.6333,
        })
        
        const {pet} = await sut.execute({
            name: "Pet 1",
            age: 1,
            breed: "Dog",
            size: "Medium",
            height: 1,
            city: "Santos",
            org_id: org.id,
        })

        expect(pet).toEqual(expect.any(Object))
    });


    it("should create a pet", async () => {
        
       await expect(sut.execute({
        name: "Pet 1",
        age: 1,
        breed: "Dog",
        size: "Medium",
        height: 1,
        city: "Santos",
        org_id: "123",
    })).rejects.toBeInstanceOf(OrgAlreadyExistsError)
    });
});