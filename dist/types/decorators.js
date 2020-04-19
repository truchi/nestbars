"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FieldType;
(function (FieldType) {
    FieldType["Int"] = "int";
    FieldType["Float"] = "float";
    FieldType["String"] = "string";
    FieldType["Date"] = "date";
    FieldType["Boolean"] = "boolean";
    FieldType["Id"] = "id";
    FieldType["Uuid"] = "uuid";
    FieldType["Created"] = "created";
    FieldType["Updated"] = "updated";
    FieldType["Version"] = "version";
    FieldType["Enum"] = "enum";
    FieldType["Set"] = "set";
    FieldType["OneToOne"] = "one-to-one";
    FieldType["OneToMany"] = "one-to-many";
    FieldType["ManyToOne"] = "many-to-one";
    FieldType["ManyToMany"] = "many-to-many";
})(FieldType = exports.FieldType || (exports.FieldType = {}));
class ScalarOptions {
}
exports.ScalarOptions = ScalarOptions;
class PrimaryOptions {
}
exports.PrimaryOptions = PrimaryOptions;
class SpecialOptions {
}
exports.SpecialOptions = SpecialOptions;
class SetOptions {
}
exports.SetOptions = SetOptions;
class RelationOptions {
}
exports.RelationOptions = RelationOptions;
//# sourceMappingURL=decorators.js.map