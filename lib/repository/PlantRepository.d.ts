import { Repository } from "typeorm";
import { Plant } from "../entity/Plant";
export declare class PlantRepository extends Repository<Plant> {
    findByName(latinName: string): Promise<Plant>;
}
