"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const PlantRepository_1 = require("./repository/PlantRepository");
const PlantFact_1 = require("./PlantFact");
const connectionOptions = {
    name: "sqlite",
    type: "sqlite",
    database: "../plants.db",
    entities: [
        __dirname + "/entity/*.js"
    ],
    autoSchemaSync: false,
};
typeorm_1.createConnection(connectionOptions).then((connection) => __awaiter(this, void 0, void 0, function* () {
    //let plantRepository = connection.getRepository(Plant);
    let latinName = "Petroselinum crispum";
    let plantRepository = connection.getCustomRepository(PlantRepository_1.PlantRepository);
    let plant = yield plantRepository.findByName(latinName);
    //console.log(plant);
    let plantFact = new PlantFact_1.PlantFact(plant.Usesnotes);
    console.log(plantFact.getCitations());
    console.log(plantFact.getParts());
    //console.log(new PlantFact(plant.WellDrained).getCitations());
    //console.log(new PlantFact(plant.WellDrained).getParts());
    //console.log(new PlantFact(plant.Medicinal).getCitations());
    console.log(new PlantFact_1.PlantFact(plant.Medicinal).getParts());
})).catch(error => console.log(error));
//# sourceMappingURL=typeorm-example.js.map