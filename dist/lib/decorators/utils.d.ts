import { SetValues, SetOptions, FieldType } from '../../types/decorators';
import { Field } from '../data';
export declare const makeFieldDecoratorFactory: <O extends {}, C extends Field<O>>(type: FieldType, Class: new (...args: any[]) => C) => (options?: O) => ({ constructor: { name: entity } }: any, name: string) => void;
export declare const makeSetDecoratorFactory: (type: FieldType.Enum | FieldType.Set) => (values: SetValues, tsName: string, options?: SetOptions) => ({ constructor: { name: entity } }: any, name: string) => void;
