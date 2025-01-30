import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe(' Create org (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should create a org', async () => {
    const response = await request(app.server).post('/org').send({
      name: 'Org 11',
      email: 'org11@example.com',
      password_hash: 'password_hash',
      phone: '1199999999',
      cep: '12345678',
      state: 'SP',
      city: 'São Paulo',
      neighborhood: 'Vila Madalena',
      street: 'Rua do limoeiroe',
      latitude: -23.5505,
      longitude: -46.6333,
    })

    expect(response.statusCode).toBe(201)
  })

  it('should not create a org', async () => {
    const response = await request(app.server).post('/org').send({
      name: 'Org 11',
      email: 'org11@example.com',
      password_hash: 'password_hash',
      phone: '+551199999999',
      cep: '12345678',
      state: 'SP',
      city: 'São Paulo',
      neighborhood: 'Vila Madalena',
      street: 'Rua do limoeiroe',
      latitude: -23.5505,
      longitude: -46.6333,
    })

    expect(response.statusCode).toBe(400)
  })
})
