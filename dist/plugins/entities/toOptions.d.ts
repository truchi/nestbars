import { Field } from '../../lib/data/Field';
declare type Options = {
    dbOptions: object;
    gqlOptions: object;
};
declare const _default: ({ dbType: type, options }: Field) => Options;
export default _default;
