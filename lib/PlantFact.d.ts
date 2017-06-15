export declare type PlantFactType = String | Boolean | Number;
export declare class PlantFact {
    value: PlantFactType;
    private citationsRE;
    constructor(value: PlantFactType);
    getCitations(): any[] | RegExpMatchArray;
    getParts(): PlantFactType[];
}
