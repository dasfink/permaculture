import "reflect-metadata";
import {createConnection, ConnectionOptions, ConnectionManager} from "typeorm";
import { expect } from "chai"

import { GardenGuideService } from "../src/service/GardenGuideService"
import { Plant } from "../src/entity/Plant"

process.env.NODE_ENV = "dev"

//const connectionManager = new Connectionmanager();
createConnection().then(async connection => {
  console.log(connection)
  describe("GardenGuideService getPlant", () => {
    it("Get a plant by scientific name", () => {
      const gardenGuideService = new GardenGuideService()
      const latinName = "Petroselinum crispum"
      let plant = gardenGuideService.getPlantByName(latinName)
      console.log(plant)
    })
  })
}).catch(error => console.log("TypeORM connection error: ", error));
