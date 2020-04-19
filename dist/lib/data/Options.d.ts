import { FieldOptions } from '../../types/decorators';
export declare type Options = {
    options: FieldOptions;
    db: object;
    gql: object;
};
export declare const OptionsFactory: (options: FieldOptions) => Options;
