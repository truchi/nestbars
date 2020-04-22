import { PathFunction } from '../../types/utils';
import { Entity } from '../../lib/data/Entity';
declare const _default: (path: PathFunction) => (entity: Entity) => {
    path: string;
    fieldDbDecorators: string[];
    hasEnums: boolean;
    hasInt: boolean;
    hasFloat: boolean;
    hasJoinColumn: boolean;
    hasJoinTable: boolean;
    hasFields: number;
    dbOptions: Partial<import("../../types/decorators").EntityOptions> & object;
    gqlOptions: Partial<import("../../types/decorators").EntityOptions>;
};
export default _default;
