import { Class } from './utils';
export declare type EntityDecorator = (options?: EntityOptions) => Function;
export declare type EntityOptions = {
    name?: string;
    description?: string;
    options?: object;
};
export declare enum FieldType {
    Id = "id",
    Uuid = "uuid",
    Int = "int",
    Float = "float",
    String = "string",
    Date = "date",
    Boolean = "boolean",
    Enum = "enum",
    Set = "set",
    Created = "created",
    Updated = "updated",
    Version = "version",
    OneToOne = "one-to-one",
    OneToMany = "one-to-many",
    ManyToOne = "many-to-one",
    ManyToMany = "many-to-many"
}
export declare type FieldOptions = PrimaryOptions | ScalarOptions | SetOptions | SpecialOptions | {};
export declare type PrimaryDecorator = (options?: PrimaryOptions) => Function;
export declare type PrimaryOptions = {
    description?: string;
    deprecation?: string;
    options?: object;
};
export declare type ScalarDecorator = (options?: ScalarOptions) => Function;
export declare type ScalarOptions = {
    primary?: boolean;
    unique?: boolean;
    nullable?: boolean;
    default?: any;
    description?: string;
    deprecation?: string;
    options?: object;
};
export declare type SetDecorator = (values: SetValues, tsName: SetTsName, options?: SetOptions) => Function;
export declare type SetValues = string[];
export declare type SetTsName = string;
export declare type SetOptions = {
    primary?: boolean;
    default?: any;
    description?: string;
    deprecation?: string;
    options?: object;
};
export declare type SpecialDecorator = (options?: SpecialOptions) => Function;
export declare type SpecialOptions = {
    primary?: boolean;
    description?: string;
    deprecation?: string;
    options?: object;
};
export declare type OneToOneDecorator<T extends Class> = (withEntity: RelationWithEntity<T>, withField: RelationWithField<T>, joinColumn?: RelationJoinColumn) => Function;
export declare type OneToManyDecorator<T extends Class> = (withEntity: RelationWithEntity<T>, withField: RelationWithField<T>) => Function;
export declare type ManyToOneDecorator<T extends Class> = (withEntity: RelationWithEntity<T>, withField: RelationWithField<T>, joinColumn?: RelationJoinColumn) => Function;
export declare type ManyToManyDecorator<T extends Class> = (withEntity: RelationWithEntity<T>, withField: RelationWithField<T>, joinTable?: RelationJoinTable) => Function;
export declare type RelationWithEntity<T> = () => T;
export declare type RelationWithField<T extends Class> = keyof InstanceType<T>;
export declare type RelationJoinColumn = boolean | object;
export declare type RelationJoinTable = boolean | object;
