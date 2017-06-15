"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PlantFact {
    constructor(/*public name: PlantFactName,*/ value) {
        this.value = value;
        this.citationsRE = /\[[\d,\s\w]+\]/g;
    }
    getCitations() {
        if (typeof this.value === 'string') {
            let matches = this.value.match(this.citationsRE);
            return matches;
        }
        else
            return [];
    }
    getParts() {
        if (typeof this.value === 'string') {
            let valueString = this.value;
            valueString = valueString.replace(this.citationsRE, "|");
            valueString = valueString.replace(/[|](\.)\s*/g, "$1|");
            let parts = valueString.split("|").filter((e) => { return e.length != 0; });
            return parts;
        }
        else
            return [this.value];
    }
}
exports.PlantFact = PlantFact;
//# sourceMappingURL=PlantFact.js.map