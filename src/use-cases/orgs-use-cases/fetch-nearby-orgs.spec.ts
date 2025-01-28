import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { FetchNearbyOrgs } from './fetch-nearby-orgs'
import { DontFetchNearbyOrgsError } from '../error/dont-fetch-nearby-orgs.error'

let orgsRepository: InMemoryOrgsRepository
let sut: FetchNearbyOrgs

describe('create org use case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new FetchNearbyOrgs(orgsRepository)
  })

  it('should be able to fetch nearby orgs', async () => {
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
      latitude: -27.2092052,
      longitude: -49.6401091,
    })

    const orgs = await sut.execute({
      latitude: -27.2092052,
      longitude: -49.6401091,
    })

    if (!orgs) {
      return null
    }

    expect(orgs).toHaveLength(1)
    expect(orgs).toEqual([
      expect.objectContaining({
        city: 'São Paulo',
      }),
    ])
  })

  it('should be able to fetch nearby orgs', async () => {
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
      latitude: -27.2092052,
      longitude: -49.6401091,
    })

    await expect(
      sut.execute({
        latitude: -30.2092052,
        longitude: -90.6401091,
      }),
    ).rejects.toBeInstanceOf(DontFetchNearbyOrgsError)
  })
})
