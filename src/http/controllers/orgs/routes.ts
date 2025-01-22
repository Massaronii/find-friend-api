import { FastifyInstance } from 'fastify'
import { createOrg } from './create'
import { searchOrgById } from './search-org-by-id'
import { fetchOrgs } from './fetch-orgs'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/org', createOrg)
  app.get('/org/:id', searchOrgById)
  app.get('/orgs', fetchOrgs)
}
