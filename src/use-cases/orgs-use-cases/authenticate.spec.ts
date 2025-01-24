import bcrypt from 'bcryptjs'
import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { AuthenticateOrg } from './authenticate'
import { InvalidCredencialsError } from '../error/invalid-credencials.error'

let orgsRepository: InMemoryOrgsRepository
let sut: AuthenticateOrg

describe('authenticate org use case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateOrg(orgsRepository)
  })

  it('should be able to login a org', async () => {
    await orgsRepository.create({
      name: 'Org 1',
      email: 'org1@example.com',
      password_hash: await bcrypt.hash('123456', 6),
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
      password: '123456',
    })

    expect(org.name).toEqual('Org 1')
  })

  it('should not be able to Authenticate with wrong email', async () => {
    await expect(
      sut.execute({
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredencialsError)
  })

  it('should not be able to Authenticate with wrong password', async () => {
    await orgsRepository.create({
      name: 'Org 1',
      email: 'org1@example.com',
      password_hash: await bcrypt.hash('123456', 6),
      phone: '+551199999999',
      cep: '12345678',
      state: 'SP',
      city: 'São Paulo',
      neighborhood: 'Vila Madalena',
      street: 'Rua do limoeiro',
      latitude: -23.5505,
      longitude: -46.6333,
    })

    await expect(
      sut.execute({
        email: 'johndoe@example.com',
        password: await bcrypt.hash('123456', 6),
      }),
    ).rejects.toBeInstanceOf(InvalidCredencialsError)
  })
})
