import { PathFunction } from '../../types/utils';
import { Entity } from '../../lib/data/Entity';
declare const _default: (path: PathFunction) => (entity: Entity) => {
    path: string;
    dbOptions: Partial<import("../../types/decorators").EntityOptions> & object;
    gqlOptions: Partial<import("../../types/decorators").EntityOptions>;
    hasEnums: boolean;
    hasInt: boolean;
    hasFloat: boolean;
    hasJoinColumn: boolean;
    hasJoinTable: boolean;
    fieldDbDecorators: string[];
};
export default _default;
