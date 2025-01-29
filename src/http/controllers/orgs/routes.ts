import { createOrg } from './create'
import { searchOrgById } from './search-org-by-id'
import { fetchOrgs } from './fetch-orgs'
import { authenticateOrg } from './authenticate'
import { FastifyInstance } from 'fastify'
import { refresh } from './refresh'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/token/refresh', refresh)
  app.post('/org/authenticate', authenticateOrg)
  app.post('/org', createOrg)
  app.get('/org/:id', searchOrgById)
  app.get('/orgs', fetchOrgs)
}
