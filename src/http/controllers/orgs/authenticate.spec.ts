import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe(' Authenticate org (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should authenticate a org', async () => {
    await request(app.server).post('/org').send({
      name: 'Org 1',
      email: 'org1@example.com',
      password_hash: 'password_hash',
      phone: '1199999999',
      cep: '12345678',
      state: 'SP',
      city: 'São Paulo',
      neighborhood: 'Vila Madalena',
      street: 'Rua do limoeiro',
      latitude: -23.5505,
      longitude: -46.6333,
    })

    const response = await request(app.server).post('/org/authenticate').send({
      email: 'org1@example.com',
      password: 'password_hash',
    })

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })

  it('should be not authenticate a org', async () => {
    await request(app.server).post('/org').send({
      name: 'Org 1',
      email: 'org11@example.com',
      password_hash: 'password_hashaaa',
      phone: '1199999999',
      cep: '12345678',
      state: 'SP',
      city: 'São Paulo',
      neighborhood: 'Vila Madalena',
      street: 'Rua do limoeiro',
      latitude: -23.5505,
      longitude: -46.6333,
    })

    const response = await request(app.server).post('/org/authenticate').send({
      email: 'org11@example.com',
      password: 'password_hash',
    })

    expect(response.status).toBe(400)
  })
})
