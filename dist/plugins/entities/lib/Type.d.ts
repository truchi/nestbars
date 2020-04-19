import { Class } from '../../../types/utils';
import { FieldType } from '../../../types/decorators';
export declare type Type = {
    type: FieldType;
    ts: string;
    db: string;
    gql: string;
    deps: Class[];
};
export declare const TypeFactory: (type: FieldType, name: string) => Type;
