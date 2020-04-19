import { Class } from './utils';
export declare type EntityDecorator = (options?: EntityOptions) => Function;
export declare type EntityOptions = {
    name?: string;
    description?: string;
    options?: object;
};
export declare enum FieldType {
    Int = "int",
    Float = "float",
    String = "string",
    Date = "date",
    Boolean = "boolean",
    Id = "id",
    Uuid = "uuid",
    Created = "created",
    Updated = "updated",
    Version = "version",
    Enum = "enum",
    Set = "set",
    OneToOne = "one-to-one",
    OneToMany = "one-to-many",
    ManyToOne = "many-to-one",
    ManyToMany = "many-to-many"
}
export declare type FieldOptions = PrimaryOptions | ScalarOptions | SetOptions | SpecialOptions | RelationOptions<any>;
export declare type ScalarDecorator = (options?: ScalarOptions) => Function;
export declare class ScalarOptions {
    primary?: boolean;
    unique?: boolean;
    nullable?: boolean;
    default?: any;
    description?: string;
    deprecation?: string;
    options?: object;
}
export declare type PrimaryDecorator = (options?: PrimaryOptions) => Function;
export declare class PrimaryOptions {
    description?: string;
    deprecation?: string;
    options?: object;
}
export declare type SpecialDecorator = (options?: SpecialOptions) => Function;
export declare class SpecialOptions {
    primary?: boolean;
    description?: string;
    deprecation?: string;
    options?: object;
}
export declare type SetDecorator = (values: SetOptions['values'], name: SetOptions['name'], options?: Omit<SetOptions, 'values' | 'name'>) => Function;
export declare class SetOptions {
    values: string[];
    name: string;
    primary?: boolean;
    default?: any;
    description?: string;
    deprecation?: string;
    options?: object;
}
export declare type OneToOneDecorator<T extends Class> = (withEntity: RelationOptions<T>['withEntity'], withField: RelationOptions<T>['withField'], joinColumn?: RelationOptions<T>['joinColumn']) => Function;
export declare type OneToManyDecorator<T extends Class> = (withEntity: RelationOptions<T>['withEntity'], withField: RelationOptions<T>['withField']) => Function;
export declare type ManyToOneDecorator<T extends Class> = (withEntity: RelationOptions<T>['withEntity'], withField: RelationOptions<T>['withField'], joinColumn?: RelationOptions<T>['joinColumn']) => Function;
export declare type ManyToManyDecorator<T extends Class> = (withEntity: RelationOptions<T>['withEntity'], withField: RelationOptions<T>['withField'], joinTable?: RelationOptions<T>['joinTable']) => Function;
export declare class RelationOptions<T extends Class> {
    withEntity: () => T;
    withField: keyof InstanceType<T>;
    joinColumn?: boolean | object;
    joinTable?: boolean | object;
    description?: string;
    deprecation?: string;
}
