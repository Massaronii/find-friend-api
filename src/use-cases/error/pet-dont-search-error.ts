export class PetDontSearchError extends Error {
  constructor(){
    super("Pet don't exists")
  }
}