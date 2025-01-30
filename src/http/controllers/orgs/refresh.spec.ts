import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Refresh Token (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to refresh a token', async () => {
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

    const authResponse = await request(app.server)
      .post('/org/authenticate')
      .send({
        email: 'org11@example.com',
        password: 'password_hash',
      })

    const cookies = authResponse.get('Set-cookie')

    if (!cookies) {
      throw new Error(
        'Cookies are undefined. Ensure the cookie is set before making this request.',
      )
    }

    const response = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookies)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})
