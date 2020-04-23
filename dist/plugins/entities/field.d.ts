import { Entity } from '../../lib/data/Entity';
import { Field } from '../../lib/data/Field';
declare const _default: (type: string, field: Field) => {
    relation: Entity;
    isPrimary: boolean;
    isGenerated: boolean;
    hasJoinColumn: boolean;
    hasJoinTable: boolean;
    isData: boolean;
    dbOptions: object;
    gqlOptions: object;
    dbDecorator: string;
    gqlDecorator: string;
    tsType: string;
    dbType: string;
    gqlType: string;
};
export default _default;
