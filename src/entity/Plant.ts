import {Entity, Column, PrimaryColumn} from "typeorm";

@Entity("Species List")
export class Plant {
  @PrimaryColumn()
	Latinname: String

	@Column()
	Author: String

	@Column()
	Botanicalreferences: String

	@Column()
	Family: String

	@Column()
	Commonname: String

	@Column("text")
	Habit: String

	@Column({name: "Deciduous/Evergreen"})
	LeafType: String

	@Column()
	Height: Number

	@Column()
	Width: Number

	@Column()
	Hardyness: Number

  @Column({ name:"Incultivation?"})
	Incultivation: Boolean

	@Column("text")
	Medicinal: String

	@Column("text")
	Range: String

	@Column("text")
	Habitat: String

	@Column()
	Soil: String

	@Column()
	Shade: String

	@Column()
	Moisture: String

  @Column({ name: "Well-drained" })
	WellDrained: Boolean

	@Column()
	Nitrogenfixer: Boolean

	@Column()
	pH: String

	@Column()
	Acid: Boolean

	@Column()
	Alkaline: Boolean

	@Column()
	Saline: Boolean

	@Column()
	Wind: String

	@Column()
	Growthrate: String

	@Column()
	Pollution: String

	@Column()
	Poorsoil: Boolean

	@Column()
	Drought: Boolean

	@Column()
	Wildlife: Boolean

	@Column()
	Woodland: Boolean

	@Column()
	Meadow: Boolean

	@Column()
	Wall: Boolean

	@Column()
	Inleaf: String

	@Column()
	Floweringtime: String

	@Column()
	Seedripens: String

	@Column()
	FlowerType: String

	@Column()
	Pollinators: String

  @Column({ name: "Self-fertile" })
	SelfFertile: String

	@Column("text")
	Knownhazards: String

	@Column()
	Synonyms: String

	@Column("text")
	Cultivationdetails: String

	@Column("text")
	Edibleuses: String

	@Column("text")
	Usesnotes: String

	@Column()
	Propagation1: String

	@Column()
	Cultivars: Boolean

	@Column()
	Cultivarsincultivation: Boolean

	@Column()
	Heavyclay: Boolean

  @Column({ name: "Pull-out" })
	PullOut: Boolean

	@Column()
	Lastupdate: Date

	@Column()
	Recordchecked: Boolean

	@Column()
	EdibilityRating: Number

	@Column()
	FrostTender: String

	@Column("text")
	SiteSpecificNotes: String

	@Column()
	Scented: Boolean

	@Column()
	MedicinalRating : Number

}