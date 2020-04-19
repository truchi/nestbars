import { FieldOptions } from '../../../types/decorators';
export declare type Options = {
    dbOptions: object;
    gqlOptions: object;
};
export declare type dbScalarOptions = {
    type: string;
};
declare const _default: (options: FieldOptions, dbType: string) => Options;
export default _default;
