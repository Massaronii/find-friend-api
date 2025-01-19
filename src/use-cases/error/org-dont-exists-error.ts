export class OrgDontExistsError extends Error {
  constructor() {
    super("Org don't already exists")
  }
}
