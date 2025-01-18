export class OrgAlreadyExistsError extends Error {
  constructor(){
    super("Org don't already exists")
  }
}