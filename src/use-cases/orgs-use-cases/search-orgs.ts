import { OrgsRepository } from "@/repositories/orgs-repository";
import { Org } from "@prisma/client";

export class FetchOrgs {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute(): Promise<Org[] | null> {

    const orgs = await this.orgsRepository.searchOrgs()

    if(!orgs) return null

    return orgs
  }
}