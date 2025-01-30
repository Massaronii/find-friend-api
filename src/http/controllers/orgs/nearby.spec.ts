import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe(' Nearby orgs (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should nearby org', async () => {
    await request(app.server).post('/org').send({
      name: 'Org 231',
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

    const response = await request(app.server).get('/orgs/nearby').query({
      latitude: -23.5505,
      longitude: -46.6333,
    })

    expect(response.status).toBe(200)
  })
})
