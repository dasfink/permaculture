import "reflect-metadata";
import {createConnection, ConnectionOptions} from "typeorm";
import { Plant } from "./entity/Plant";

const connectionOptions : ConnectionOptions = {
  name: "sqlite",
  type: "sqlite",
  database: "./plants.db",
  entities: [
    __dirname + "/entity/*.js"
  ],
  autoSchemaSync: false,
};

createConnection(connectionOptions).then(async connection => {
  let plantRepository = connection.getRepository(Plant);
  let savedPlants = await plantRepository.find();
  console.log("All plants from the db: ", savedPlants);
    
}).catch(error => console.log(error));
