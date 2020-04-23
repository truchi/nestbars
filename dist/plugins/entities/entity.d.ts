import { PathFunction } from '../../types/utils';
import { Entity } from '../../lib/data/Entity';
declare const _default: (entitiesPath: PathFunction) => (type: string, entity: Entity) => {
    entityPath: string;
    enums: import("../../lib/data/Field").Field[];
    relations: any[];
    fieldDbDecorators: any[];
    hasFields: boolean;
    hasEnums: boolean;
    hasInt: boolean;
    hasFloat: boolean;
    hasJoinColumn: boolean;
    hasJoinTable: boolean;
    dbOptions: Partial<import("../../types/decorators").EntityOptions> & object;
    gqlOptions: Partial<import("../../types/decorators").EntityOptions>;
};
export default _default;
