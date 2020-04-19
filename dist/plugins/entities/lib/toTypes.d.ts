import { FieldType } from '../../../types/decorators';
declare type Types = {
    tsType: string;
    dbType: string;
    gqlType: string;
};
declare const _default: (type: FieldType, name?: string) => Types;
export default _default;
