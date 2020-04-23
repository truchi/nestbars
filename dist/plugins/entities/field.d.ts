import { Entity } from '../../lib/data/Entity';
import { Field } from '../../lib/data/Field';
declare const _default: (type: string, field: Field) => {
    relation: Entity;
    hasJoinColumn: boolean;
    hasJoinTable: boolean;
    isGqlInt: boolean;
    isGqlFloat: boolean;
    dbOptions: object;
    gqlOptions: object;
    dbDecorator: string;
    gqlDecorator: string;
    tsType: string;
    dbType: string;
    gqlType: string;
};
export default _default;
