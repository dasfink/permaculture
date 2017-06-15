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
/*
Copyright 2017 Michael Finkler (info@plantfortomorrow.org)

Service facade that provides information for the GardenGuide bot.
*/
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const PlantRepository_1 = require("../repository/PlantRepository");
class GardenGuideService {
    constructor() { }
    getPlantByName(plantName) {
        return __awaiter(this, void 0, void 0, function* () {
            let plantRepository = typeorm_1.getEntityManager().getCustomRepository(PlantRepository_1.PlantRepository);
            let plant = yield plantRepository.findByName(plantName);
            return plant;
        });
    }
}
exports.GardenGuideService = GardenGuideService;
//# sourceMappingURL=GardenGuideService.js.map