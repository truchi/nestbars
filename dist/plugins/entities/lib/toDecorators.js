"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const decorators_1 = require("../../../types/decorators");
exports.default = (type) => ({
    dbDecorator: (() => {
        switch (type) {
            case decorators_1.FieldType.Id:
            case decorators_1.FieldType.Uuid:
                return 'PrimaryGeneratedColumn';
            case decorators_1.FieldType.Created:
                return 'CreateDateColumn';
            case decorators_1.FieldType.Updated:
                return 'UpdateDateColumn';
            case decorators_1.FieldType.Version:
                return 'VersionColumn';
            default:
                return 'Column';
        }
    })(),
    gqlDecorator: 'Field',
});
//# sourceMappingURL=toDecorators.js.map