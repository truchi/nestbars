import { Field } from '../../../lib/data/Field';
declare type Types = {
    tsType: string;
    dbType: string;
    gqlType: string;
};
declare const _default: ({ type }: Field, name: string) => Types;
export default _default;
