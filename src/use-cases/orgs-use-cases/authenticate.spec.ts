import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { AuthenticateOrg } from './authenticate'

let orgsRepository: InMemoryOrgsRepository
let sut: AuthenticateOrg

describe('create org use case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateOrg(orgsRepository)
  })

  it('should be able to login a org', async () => {
    await orgsRepository.create({
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

    const { org } = await sut.execute({
      email: 'org1@example.com',
      password: 'password_hash',
    })

    expect(org.name).toEqual('Org 1')
  })
})
