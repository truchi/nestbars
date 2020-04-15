import { FieldType, FieldOptions } from '../../types/decorators';
export declare class Field<T extends FieldOptions> {
    readonly entity: string;
    readonly name: string;
    readonly options: T;
    readonly type: FieldType;
    static all: Field<FieldOptions>[];
    constructor(entity: string, name: string, options: T, type: FieldType);
    tsType(): string;
    dbType(): string;
    gqlType(): string;
    dependencies(): string[];
    dbOptions(): object;
    gqlOptions(): object;
    static add(field: Field<FieldOptions>): void;
}
