/*
Copyright 2017 Michael Finkler (info@plantfortomorrow.org)

Service facade that provides information for the GardenGuide bot.
*/
import "reflect-metadata";
import { getEntityManager, ConnectionManager } from "typeorm";
import { Plant } from "../entity/Plant";
import { PlantRepository } from "../repository/PlantRepository";
import { PlantFact } from "../PlantFact";


export class GardenGuideService {

  constructor() {}

  public async getPlantByName(plantName: String) {
    let plantRepository = getEntityManager().getCustomRepository(PlantRepository)
    let plant: Plant = await plantRepository.findByName(plantName)
    return plant
  }
}

