import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { FetchOrgs } from './fetch-orgs'
import { OrgDontExistsError } from '../error/org-dont-exists-error'

let orgsRepository: InMemoryOrgsRepository
let sut: FetchOrgs

describe('fetch orgs use case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new FetchOrgs(orgsRepository)
  })

  it('should fetch orgs', async () => {
    await orgsRepository.create({
      name: 'Org 1',
      email: 'org1@example.com',
      password_hash: 'password_hash',
      phone: '+551199999999',
      cep: '12345678',
      state: 'SP',
      city: 'Santos',
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
      city: 'sao paulo',
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
      city: 'criciuma',
      neighborhood: 'Vila Madalena',
      street: 'Rua do limoeiro',
      latitude: -23.5505,
      longitude: -46.6333,
    })

    const org = await sut.execute()

    if (!org) return

    expect(org).toEqual(expect.any(Array))
    expect(org.length).toEqual(3)
  })

  it('fetch not orgs', async () => {
    await expect(sut.execute()).rejects.toBeInstanceOf(OrgDontExistsError)
  })
})
