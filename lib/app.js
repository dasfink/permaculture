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
const Plant_1 = require("./entity/Plant");
const connectionOptions = {
    name: "sqlite",
    type: "sqlite",
    database: "./plants.db",
    entities: [
        __dirname + "/entity/*.js"
    ],
    autoSchemaSync: false,
};
typeorm_1.createConnection(connectionOptions).then((connection) => __awaiter(this, void 0, void 0, function* () {
    let plantRepository = connection.getRepository(Plant_1.Plant);
    let savedPlants = yield plantRepository.find();
    console.log("All plants from the db: ", savedPlants);
})).catch(error => console.log(error));
