import {describe, it, expect, beforeEach} from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { CreateOrg } from './create-org'

let orgsRepository: InMemoryOrgsRepository
let sut: CreateOrg

describe('create org use case', () => {
    beforeEach(() => {
        orgsRepository = new InMemoryOrgsRepository()
        sut = new CreateOrg(orgsRepository)
      })

      it('should create a org', async () => {
        const {org} = await sut.execute({
          name: 'Org 1',
          email: 'org1@example.com',
          password_hash: 'password_hash',
          phone: '+551199999999',
          cep: '12345678',
          state: 'SP',
          city: 'São Paulo',
          neighborhood: 'Vila Madalena',
          street: 'Rua do limoeiro',
          latitude: -23.5505,
          longitude: -46.6333,
        })

        expect(org.cep).toEqual(expect.any(String))
      })
})