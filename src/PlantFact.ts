export type PlantFactType = String | Boolean | Number


export class PlantFact {
  private citationsRE: RegExp = /\[[\d,\s\w]+\]/g
  
  constructor(/*public name: PlantFactName,*/
    public value: PlantFactType
  ) { }

  getCitations() { 
    if (typeof this.value === 'string') {
      let matches = (this.value as String).match(this.citationsRE);
      return matches;
    } else
      return [];
  }

  getParts() { 
    if (typeof this.value === 'string') {
      let valueString = (this.value as String)
      valueString = valueString.replace(this.citationsRE, "|")
      valueString = valueString.replace(/[|](\.)\s*/g, "$1|")
      let parts = valueString.split("|").filter((e)=> { return e.length != 0})
      return parts;
    } else
      return [this.value];
  }
}