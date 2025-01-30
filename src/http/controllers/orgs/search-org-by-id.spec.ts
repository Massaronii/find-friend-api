import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Search org by id (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should search org by id', async () => {
    const org = {
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
    }

    await request(app.server).post('/org').send(org)

    const searchOrgs = await request(app.server).get(`/orgs`).send()

    const response = await request(app.server).get(
      `/org/${searchOrgs.body[0].id}`,
    )

    expect(response.status).toBe(200)
  })
})
