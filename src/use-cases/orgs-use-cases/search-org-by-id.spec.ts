import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { SearchOrgById } from "./search-org-by-id";

describe("search org by id", () => {
    let orgsRepository:InMemoryOrgsRepository
    let sut: SearchOrgById
    beforeEach(() => {
      orgsRepository = new InMemoryOrgsRepository()
      sut = new SearchOrgById(orgsRepository)
    });

  it("should search org by id", async () => {
      const org =  await orgsRepository.create({
          name: 'Org 1',
          email: 'org1@example.com',
          password_hash: 'password_hash',
          phone: '+551199999999',
          cep: '12345678',
          state: 'SP',
          city: "Santos",
          neighborhood: 'Vila Madalena',
          street: 'Rua do limoeiro',
          latitude: -23.5505,
          longitude: -46.6333,
        })

        const orgById = await sut.execute(org.id)

        expect(orgById).toEqual(expect.any(Object))
  });

  it("should not search org by id", async () => {
    const org = {
        id: '123',
        name: 'Org 1',
        email: 'org1@example.com',
        password_hash: 'password_hash',
        phone: '+551199999999',
        cep: '12345678',
        state: 'SP',
        city: "Santos",
        neighborhood: 'Vila Madalena',
        street: 'Rua do limoeiro',
        latitude: -23.5505,
        longitude: -46.6333,
      }

      const orgById = await sut.execute(org.id)

      expect(orgById).toEqual(null)
});
});