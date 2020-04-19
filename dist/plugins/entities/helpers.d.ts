import { Class, PathFunction } from '../../types/utils';
import { Entity, Field } from '../../lib/data';
declare const _default: (entities: Class[], dest: PathFunction) => {
    enums(entity: Entity): Field[];
    hasJoinColumn(entity: Entity): boolean;
    hasJoinTable(entity: Entity): boolean;
};
export default _default;
