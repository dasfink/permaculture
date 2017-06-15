import {Repository} from "typeorm";
import {Plant} from "../entity/Plant";
import { EntityRepository } from "typeorm";

@EntityRepository(Plant) 
export class PlantRepository extends Repository<Plant> {

  findByName(name: String) {
    console.log(name)
    return this.findOne({ Latinname: name })
  }

}