import fastify from 'fastify'
// import fastifyJwt from '@fastify/jwt'
// import fastifyCookie from '@fastify/cookie'
import { ZodError } from 'zod'
import { env } from './utils/env'
import { orgsRoutes } from './http/controllers/orgs/routes'

export const app = fastify()

app.register(orgsRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error',
      issues: error.format(),
    })
  }

  if (env.NODE_ENV !== 'prod') {
    console.error(error)
  } else {
    // deveria ter dataddog/newrelic e etc para pegar o log na plataforma de monitoramento
  }

  return reply.status(500).send({
    message: 'Internal server error',
  })
})
