import {describe, it, expect, beforeEach} from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { GetOrgs } from './get-orgs'

let orgsRepository: InMemoryOrgsRepository
let sut: GetOrgs
 

describe('get orgs use case', () => {
    beforeEach(() => {
        orgsRepository = new InMemoryOrgsRepository()
        sut = new GetOrgs(orgsRepository)
      })

      it('should search orgs', async () => {
           
        await orgsRepository.create({
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

        await orgsRepository.create({
          name: 'Org 1',
          email: 'org1@example.com',
          password_hash: 'password_hash',
          phone: '+551199999999',
          cep: '12345678',
          state: 'SP',
          city: "sao paulo",
          neighborhood: 'Vila Madalena',
          street: 'Rua do limoeiro',
          latitude: -23.5505,
          longitude: -46.6333,
        })

        await orgsRepository.create({
          name: 'Org 1',
          email: 'org1@example.com',
          password_hash: 'password_hash',
          phone: '+551199999999',
          cep: '12345678',
          state: 'SP',
          city: "criciuma",
          neighborhood: 'Vila Madalena',
          street: 'Rua do limoeiro',
          latitude: -23.5505,
          longitude: -46.6333,
        })

        const org = await sut.execute()

        console.log(org)

        expect(org).toEqual(expect.any(Array))
      })
})