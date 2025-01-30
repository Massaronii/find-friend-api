import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe(' Create pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should create a pet', async () => {
    await request(app.server).post('/org').send({
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

    const searchOrgs = await request(app.server).get(`/orgs`).send()

    expect(searchOrgs.statusCode).toBe(200)

    const authResponse = await request(app.server)
      .post('/org/authenticate')
      .send({
        email: 'org11@example.com',
        password: 'password_hash',
      })

    const { token } = authResponse.body

    const response = await request(app.server)
      .post('/org/pet')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Pet 11',
        age: 10,
        breed: 'Dog',
        size: 'Medium',
        height: 15,
        city: 'Santos',
        org_id: searchOrgs.body[0].id,
      })

    expect(response.statusCode).toBe(201)
  })
})
