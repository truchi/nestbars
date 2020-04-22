"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deep_freeze_1 = __importDefault(require("deep-freeze"));
const decorators_1 = require("../../types/decorators");
const utils_1 = require("../utils");
const Field_1 = require("./Field");
const relations = {
    oneToOne: [],
    oneToMany: [],
    manyToOne: [],
    manyToMany: [],
    one: [],
    many: [],
    toOne: [],
    toMany: [],
    all: [],
};
let ENTITY_DATA = {};
exports.get = (entity) => ENTITY_DATA[entity.name];
exports.set = (entity, data) => void (ENTITY_DATA[entity.name] = data);
exports.reset = () => void (ENTITY_DATA = {});
class Entity {
    constructor(name, options) {
        this.name = name;
        this.options = options;
        this.fields = [];
        this.enums = [];
        this.primaryFields = [];
        this.generatedFields = [];
        this.dataFields = [];
        this.relations = relations;
    }
    async init() {
        const relations = (...types) => utils_1.unique(this.by(...types).map(({ relation }) => relation));
        this.enums = utils_1.unique(this.by(decorators_1.SetOptions).map(({ enum: e }) => e));
        this.primaryFields = this.fields.filter(({ isPrimary }) => isPrimary);
        this.generatedFields = this.fields.filter(({ isGenerated }) => isGenerated);
        this.dataFields = this.fields.filter(({ isData }) => isData);
        this.relations = {
            oneToOne: relations(decorators_1.FieldType.OneToOne),
            oneToMany: relations(decorators_1.FieldType.OneToMany),
            manyToOne: relations(decorators_1.FieldType.ManyToOne),
            manyToMany: relations(decorators_1.FieldType.ManyToMany),
            one: relations(decorators_1.FieldType.OneToOne, decorators_1.FieldType.OneToMany),
            many: relations(decorators_1.FieldType.ManyToOne, decorators_1.FieldType.ManyToMany),
            toOne: relations(decorators_1.FieldType.OneToOne, decorators_1.FieldType.ManyToOne),
            toMany: relations(decorators_1.FieldType.OneToMany, decorators_1.FieldType.ManyToMany),
            all: relations(decorators_1.RelationOptions),
        };
        return this;
    }
    filter(fn) {
        return this.fields.filter(fn);
    }
    by(...args) {
        return this.filter(field => field.is(...args));
    }
    data() {
        return exports.get(this);
    }
    static add(entity) {
        Entity.all.push(entity);
    }
    static find(name) {
        return Entity.all.find(entity => entity.name === name);
    }
    static async init() {
        await 0;
        Field_1.Field.init();
        Entity.all.map(entity => ((entity.fields = Field_1.Field.all.filter(field => field.entity === entity)),
            entity.init()));
        deep_freeze_1.default(Entity);
        return Entity.all;
    }
}
exports.Entity = Entity;
Entity.all = [];
//# sourceMappingURL=Entity.js.map