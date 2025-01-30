import { PetsRepository } from '@/repositories/pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { SearchPetByParams } from './search-pet-params'
import { OrgsRepository } from '@/repositories/orgs-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { PetDontSearchError } from '../error/pet-dont-search-error'

describe('search pet by city', () => {
  let petsRepository: PetsRepository
  let orgsRepository: OrgsRepository
  let sut: SearchPetByParams

  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    sut = new SearchPetByParams(petsRepository)
  })

  it('should not search pet by city', async () => {
    const org = await orgsRepository.create({
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

    await petsRepository.create({
      name: 'Pet 1',
      age: 1,
      breed: 'Dog',
      size: 'Medium',
      height: 1,
      city: 'Santos',
      org_id: org.id,
    })

    await petsRepository.create({
      name: 'Pet 2',
      age: 1,
      breed: 'Dog',
      size: 'Medium',
      height: 1,
      city: 'Santos',
      org_id: org.id,
    })

    const pet = await sut.execute({
      city: 'Santosss',
      page: 1,
    })

    expect(pet).rejects.toBeInstanceOf(PetDontSearchError)
  })

  it('should search pet by city', async () => {
    const org = await orgsRepository.create({
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

    await petsRepository.create({
      name: 'Pet 1',
      age: 1,
      breed: 'Dog',
      size: 'Medium',
      height: 1,
      city: 'Santos',
      org_id: org.id,
    })

    await petsRepository.create({
      name: 'Pet 2',
      age: 1,
      breed: 'Dog',
      size: 'Medium',
      height: 1,
      city: 'Santos',
      org_id: org.id,
    })

    const pet = await sut.execute({
      city: 'Santos',
      page: 1,
    })

    expect(pet).toEqual(expect.any(Array))
    expect(pet?.length).toEqual(2)
  })

  it('should search pet by name', async () => {
    const org = await orgsRepository.create({
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

    await petsRepository.create({
      name: 'Pet 1',
      age: 1,
      breed: 'Dog',
      size: 'Medium',
      height: 1,
      city: 'Santos',
      org_id: org.id,
    })

    await petsRepository.create({
      name: 'Pet 2',
      age: 1,
      breed: 'Dog',
      size: 'Medium',
      height: 1,
      city: 'Santos',
      org_id: org.id,
    })

    const pet = await sut.execute({
      name: 'Pet 2',
      page: 1,
    })

    expect(pet).toEqual(expect.any(Array))
    expect(pet?.length).toEqual(1)
  })

  it('should dont search pet by name', async () => {
    const org = await orgsRepository.create({
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

    await petsRepository.create({
      name: 'Pet 1',
      age: 1,
      breed: 'Dog',
      size: 'Medium',
      height: 1,
      city: 'Santos',
      org_id: org.id,
    })

    await petsRepository.create({
      name: 'Pet 2',
      age: 1,
      breed: 'Dog',
      size: 'Medium',
      height: 1,
      city: 'Santos',
      org_id: org.id,
    })

    const pet = await sut.execute({
      name: 'Pet 22',
      page: 1,
    })

    expect(pet).rejects.toBeInstanceOf(PetDontSearchError)
  })

  it('should dont search pet by id', async () => {
    const org = await orgsRepository.create({
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

    await petsRepository.create({
      name: 'Pet 1',
      age: 1,
      breed: 'Dog',
      size: 'Medium',
      height: 1,
      city: 'Santos',
      org_id: org.id,
    })

    await petsRepository.create({
      name: 'Pet 2',
      age: 1,
      breed: 'Dog',
      size: 'Medium',
      height: 1,
      city: 'Santos',
      org_id: org.id,
    })

    const pet = await sut.execute({
      id: '123',
      page: 1,
    })

    expect(pet).rejects.toBeInstanceOf(PetDontSearchError)
  })

  it('should search pet by id', async () => {
    const org = await orgsRepository.create({
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

    const createPet = await petsRepository.create({
      name: 'Pet 1',
      age: 1,
      breed: 'Dog',
      size: 'Medium',
      height: 1,
      city: 'Santos',
      org_id: org.id,
    })

    await petsRepository.create({
      name: 'Pet 2',
      age: 1,
      breed: 'Dog',
      size: 'Medium',
      height: 1,
      city: 'Santos',
      org_id: org.id,
    })

    const pet = await sut.execute({
      id: createPet.id,
      page: 1,
    })

    expect(pet).toEqual(expect.any(Array))
    expect(pet?.length).toEqual(1)
  })

  it('should search pet by age', async () => {
    const org = await orgsRepository.create({
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

    const createPet = await petsRepository.create({
      name: 'Pet 1',
      age: 1,
      breed: 'Dog',
      size: 'Medium',
      height: 1,
      city: 'Santos',
      org_id: org.id,
    })

    await petsRepository.create({
      name: 'Pet 2',
      age: 1,
      breed: 'Dog',
      size: 'Medium',
      height: 1,
      city: 'Santos',
      org_id: org.id,
    })

    const pet = await sut.execute({
      age: createPet.age,
      page: 1,
    })

    expect(pet).toEqual(expect.any(Array))
    expect(pet?.length).toEqual(2)
  })

  it('should search pet by age', async () => {
    const org = await orgsRepository.create({
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

    await petsRepository.create({
      name: 'Pet 1',
      age: 1,
      breed: 'Dog',
      size: 'Medium',
      height: 1,
      city: 'Santos',
      org_id: org.id,
    })

    await petsRepository.create({
      name: 'Pet 2',
      age: 1,
      breed: 'Dog',
      size: 'Medium',
      height: 1,
      city: 'Santos',
      org_id: org.id,
    })

    const pet = await sut.execute({
      age: 3,
      page: 1,
    })

    expect(pet).rejects.toBeInstanceOf(PetDontSearchError)
  })

  it('should search pet by breed', async () => {
    const org = await orgsRepository.create({
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

    const createPet = await petsRepository.create({
      name: 'Pet 1',
      age: 1,
      breed: 'Dog',
      size: 'Medium',
      height: 1,
      city: 'Santos',
      org_id: org.id,
    })

    await petsRepository.create({
      name: 'Pet 2',
      age: 1,
      breed: 'Dog',
      size: 'Medium',
      height: 1,
      city: 'Santos',
      org_id: org.id,
    })

    const pet = await sut.execute({
      breed: createPet.breed,
      page: 1,
    })

    expect(pet).toEqual(expect.any(Array))
    expect(pet?.length).toEqual(2)
  })

  it('should search pet by breed', async () => {
    const org = await orgsRepository.create({
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

    await petsRepository.create({
      name: 'Pet 1',
      age: 1,
      breed: 'Dog',
      size: 'Medium',
      height: 1,
      city: 'Santos',
      org_id: org.id,
    })

    await petsRepository.create({
      name: 'Pet 2',
      age: 1,
      breed: 'Dog',
      size: 'Medium',
      height: 1,
      city: 'Santos',
      org_id: org.id,
    })

    const pet = await sut.execute({
      breed: 'ghsa',
      page: 1,
    })

    expect(pet).rejects.toBeInstanceOf(PetDontSearchError)
  })

  it('should search pet by size', async () => {
    const org = await orgsRepository.create({
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

    const createPet = await petsRepository.create({
      name: 'Pet 1',
      age: 1,
      breed: 'Dog',
      size: 'Medium',
      height: 1,
      city: 'Santos',
      org_id: org.id,
    })

    await petsRepository.create({
      name: 'Pet 2',
      age: 1,
      breed: 'Dog',
      size: 'Medium',
      height: 1,
      city: 'Santos',
      org_id: org.id,
    })

    const pet = await sut.execute({
      size: createPet.size,
      page: 1,
    })

    expect(pet).toEqual(expect.any(Array))
    expect(pet?.length).toEqual(2)
  })

  it('should dont search pet by size', async () => {
    const org = await orgsRepository.create({
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

    await petsRepository.create({
      name: 'Pet 1',
      age: 1,
      breed: 'Dog',
      size: 'Medium',
      height: 1,
      city: 'Santos',
      org_id: org.id,
    })

    await petsRepository.create({
      name: 'Pet 2',
      age: 1,
      breed: 'Dog',
      size: 'Medium',
      height: 1,
      city: 'Santos',
      org_id: org.id,
    })

    const pet = await sut.execute({
      size: 'large',
      page: 1,
    })

    expect(pet).rejects.toBeInstanceOf(PetDontSearchError)
  })

  it('should search pet by height', async () => {
    const org = await orgsRepository.create({
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

    const createPet = await petsRepository.create({
      name: 'Pet 1',
      age: 1,
      breed: 'Dog',
      size: 'Medium',
      height: 1,
      city: 'Santos',
      org_id: org.id,
    })

    await petsRepository.create({
      name: 'Pet 2',
      age: 1,
      breed: 'Dog',
      size: 'Medium',
      height: 1,
      city: 'Santos',
      org_id: org.id,
    })

    const pet = await sut.execute({
      height: createPet.height,
      page: 1,
    })

    expect(pet).toEqual(expect.any(Array))
    expect(pet?.length).toEqual(2)
  })

  it('should dont search pet by height', async () => {
    const org = await orgsRepository.create({
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

    await petsRepository.create({
      name: 'Pet 1',
      age: 1,
      breed: 'Dog',
      size: 'Medium',
      height: 1,
      city: 'Santos',
      org_id: org.id,
    })

    await petsRepository.create({
      name: 'Pet 2',
      age: 1,
      breed: 'Dog',
      size: 'Medium',
      height: 1,
      city: 'Santos',
      org_id: org.id,
    })

    const pet = await sut.execute({
      height: 2,
      page: 1,
    })

    expect(pet).rejects.toBeInstanceOf(PetDontSearchError)
  })

  it('should search pet by org_id', async () => {
    const org = await orgsRepository.create({
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

    const createPet = await petsRepository.create({
      name: 'Pet 1',
      age: 1,
      breed: 'Dog',
      size: 'Medium',
      height: 1,
      city: 'Santos',
      org_id: org.id,
    })

    await petsRepository.create({
      name: 'Pet 2',
      age: 1,
      breed: 'Dog',
      size: 'Medium',
      height: 1,
      city: 'Santos',
      org_id: org.id,
    })

    const pet = await sut.execute({
      org_id: createPet.org_id,
      page: 1,
    })

    expect(pet).toEqual(expect.any(Array))
    expect(pet?.length).toEqual(2)
  })

  it('should search pet by org_id', async () => {
    const org = await orgsRepository.create({
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

    await petsRepository.create({
      name: 'Pet 1',
      age: 1,
      breed: 'Dog',
      size: 'Medium',
      height: 1,
      city: 'Santos',
      org_id: org.id,
    })

    await petsRepository.create({
      name: 'Pet 2',
      age: 1,
      breed: 'Dog',
      size: 'Medium',
      height: 1,
      city: 'Santos',
      org_id: org.id,
    })

    const pet = await sut.execute({
      org_id: '123123',
      page: 1,
    })

    expect(pet).rejects.toBeInstanceOf(PetDontSearchError)
  })
})
