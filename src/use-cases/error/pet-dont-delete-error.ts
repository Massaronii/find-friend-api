export class PetDontDeleteError extends Error {
  constructor() {
    super("Pet don't delete, retry")
  }
}
