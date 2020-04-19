import { Entity } from '../../lib/data/Entity';
import { Field } from '../../lib/data/Field';
declare const _default: {
    enums(entity: Entity): Field[];
    hasJoinColumn(entity: Entity): boolean;
    hasJoinTable(entity: Entity): boolean;
};
export default _default;
