import { InvalidCredencialsError } from '@/use-cases/error/invalid-credencials.error'
import { makeAuthenticateOrgUseCase } from '@/use-cases/factories/orgs/make-authenticateOrg-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticateOrg(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const schemaAuthenticateOrg = z.object({
    email: z.string().email(),
    password: z.string().min(2).max(20),
  })

  const { email, password } = schemaAuthenticateOrg.parse(request.body)

  try {
    const useCase = makeAuthenticateOrgUseCase()

    const { org } = await useCase.execute({
      email,
      password,
    })

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: org.id,
        },
      },
    )

    const refreshToken = await reply.jwtSign(
      {},
      {
        sign: {
          sub: org.id,
          expiresIn: '7d',
        },
      },
    )

    return reply
      .setCookie('refreshToken', refreshToken, {
        httpOnly: true,
        sameSite: 'strict',
        path: '/',
        secure: true,
      })
      .status(200)
      .send({ token })
  } catch (error) {
    if (error instanceof InvalidCredencialsError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}
