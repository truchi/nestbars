import { Class } from '../../types/utils';
import { FieldType, SetOptions, EntityOptions } from '../../types/decorators';
export declare const makeEntityDecoratorFactory: () => (options?: EntityOptions) => ({ name }: any) => void;
export declare const makeFieldDecoratorFactory: (type: FieldType, OptionsClass: Class) => (options?: any) => ({ constructor: { name: entity } }: any, name: string) => void;
export declare const makeSetFieldDecoratorFactory: (type: FieldType) => (values: string[], tsName: string, options?: Pick<SetOptions, "primary" | "default" | "description" | "deprecation" | "options">) => ({ constructor: { name: entity } }: any, name: string) => void;
export declare const makeRelationDecoratorFactory: (type: FieldType) => <T extends Class>(withEntity: () => T, withField: keyof InstanceType<T>) => ({ constructor: { name: entity } }: any, name: string) => void;
export declare const makeJoinColumnRelationDecoratorFactory: (type: FieldType) => <T extends Class>(withEntity: () => T, withField: keyof InstanceType<T>, joinColumn?: boolean | object) => ({ constructor: { name: entity } }: any, name: string) => void;
export declare const makeJoinTableRelationDecoratorFactory: (type: FieldType) => <T extends Class>(withEntity: () => T, withField: keyof InstanceType<T>, joinTable?: boolean | object) => ({ constructor: { name: entity } }: any, name: string) => void;
