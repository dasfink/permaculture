import {PlantFact} from "../src/PlantFact"
import { expect } from "chai"

const testFact = `Fact1[123].
                  Fact2[abc].
                  Fact3[123,abc].`

describe("PlantFact", () => {
  it('should initialize a value', () =>{
    const result = new PlantFact(testFact)
    expect(result.value).to.equal(testFact)
  })

  it ('should extract citations', () => {
    const result = new PlantFact(testFact)
    const citations = result.getCitations()
    expect(citations.length).to.equal(3)
    expect(citations).to.contain("[123]")
  })

  it('should parse parts', () => {
    const result = new PlantFact(testFact)
    const parts = result.getParts() 
    console.log(parts)
    expect(parts.length).to.equal(3);
    expect(parts[0]).to.equal('Fact1.')
  })
})