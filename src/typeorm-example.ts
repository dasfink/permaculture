import "reflect-metadata";
import {createConnection, ConnectionOptions} from "typeorm";
import { Plant } from "./entity/Plant";
import { PlantRepository } from "./repository/PlantRepository";
import { PlantFact } from "./PlantFact";

const connectionOptions : ConnectionOptions = {
  name: "sqlite",
  type: "sqlite",
  database: "../plants.db",
  entities: [
    __dirname + "/entity/*.js"
  ],
  autoSchemaSync: false,
};

createConnection(connectionOptions).then(async connection => {
  //let plantRepository = connection.getRepository(Plant);
  let latinName = "Petroselinum crispum";
  let plantRepository = connection.getCustomRepository(PlantRepository);
  let plant = await plantRepository.findByName(latinName);
  //console.log(plant);
  
  let plantFact = new PlantFact(plant.Usesnotes);
  console.log(plantFact.getCitations());
  console.log(plantFact.getParts());

  //console.log(new PlantFact(plant.WellDrained).getCitations());
  //console.log(new PlantFact(plant.WellDrained).getParts());

  //console.log(new PlantFact(plant.Medicinal).getCitations());
  console.log(new PlantFact(plant.Medicinal).getParts());
}).catch(error => console.log(error));
