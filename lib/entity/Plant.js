"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
let Plant = class Plant {
};
__decorate([
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", String)
], Plant.prototype, "Latinname", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Plant.prototype, "Author", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Plant.prototype, "Botanicalreferences", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Plant.prototype, "Family", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Plant.prototype, "Commonname", void 0);
__decorate([
    typeorm_1.Column("text"),
    __metadata("design:type", String)
], Plant.prototype, "Habit", void 0);
__decorate([
    typeorm_1.Column({ name: "Deciduous/Evergreen" }),
    __metadata("design:type", String)
], Plant.prototype, "LeafType", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Plant.prototype, "Height", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Plant.prototype, "Width", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Plant.prototype, "Hardyness", void 0);
__decorate([
    typeorm_1.Column({ name: "Incultivation?" }),
    __metadata("design:type", Boolean)
], Plant.prototype, "Incultivation", void 0);
__decorate([
    typeorm_1.Column("text"),
    __metadata("design:type", String)
], Plant.prototype, "Medicinal", void 0);
__decorate([
    typeorm_1.Column("text"),
    __metadata("design:type", String)
], Plant.prototype, "Range", void 0);
__decorate([
    typeorm_1.Column("text"),
    __metadata("design:type", String)
], Plant.prototype, "Habitat", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Plant.prototype, "Soil", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Plant.prototype, "Shade", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Plant.prototype, "Moisture", void 0);
__decorate([
    typeorm_1.Column({ name: "Well-drained" }),
    __metadata("design:type", Boolean)
], Plant.prototype, "WellDrained", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], Plant.prototype, "Nitrogenfixer", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Plant.prototype, "pH", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], Plant.prototype, "Acid", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], Plant.prototype, "Alkaline", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], Plant.prototype, "Saline", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Plant.prototype, "Wind", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Plant.prototype, "Growthrate", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Plant.prototype, "Pollution", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], Plant.prototype, "Poorsoil", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], Plant.prototype, "Drought", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], Plant.prototype, "Wildlife", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], Plant.prototype, "Woodland", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], Plant.prototype, "Meadow", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], Plant.prototype, "Wall", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Plant.prototype, "Inleaf", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Plant.prototype, "Floweringtime", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Plant.prototype, "Seedripens", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Plant.prototype, "FlowerType", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Plant.prototype, "Pollinators", void 0);
__decorate([
    typeorm_1.Column({ name: "Self-fertile" }),
    __metadata("design:type", String)
], Plant.prototype, "SelfFertile", void 0);
__decorate([
    typeorm_1.Column("text"),
    __metadata("design:type", String)
], Plant.prototype, "Knownhazards", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Plant.prototype, "Synonyms", void 0);
__decorate([
    typeorm_1.Column("text"),
    __metadata("design:type", String)
], Plant.prototype, "Cultivationdetails", void 0);
__decorate([
    typeorm_1.Column("text"),
    __metadata("design:type", String)
], Plant.prototype, "Edibleuses", void 0);
__decorate([
    typeorm_1.Column("text"),
    __metadata("design:type", String)
], Plant.prototype, "Usesnotes", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Plant.prototype, "Propagation1", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], Plant.prototype, "Cultivars", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], Plant.prototype, "Cultivarsincultivation", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], Plant.prototype, "Heavyclay", void 0);
__decorate([
    typeorm_1.Column({ name: "Pull-out" }),
    __metadata("design:type", Boolean)
], Plant.prototype, "PullOut", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], Plant.prototype, "Lastupdate", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], Plant.prototype, "Recordchecked", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Plant.prototype, "EdibilityRating", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Plant.prototype, "FrostTender", void 0);
__decorate([
    typeorm_1.Column("text"),
    __metadata("design:type", String)
], Plant.prototype, "SiteSpecificNotes", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], Plant.prototype, "Scented", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Plant.prototype, "MedicinalRating", void 0);
Plant = __decorate([
    typeorm_1.Entity("Species List")
], Plant);
exports.Plant = Plant;
//# sourceMappingURL=Plant.js.map