export class DontFetchNearbyOrgsError extends Error {
  constructor() {
    super('Não há orgs próximos a você')
  }
}
