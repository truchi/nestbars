import {
  SetValues,
  SetTsName,
  SetOptions,
  FieldType,
} from '../../types/decorators'
import { Field, SetField } from '../data'

export const makeFieldDecoratorFactory = <O extends {}, C extends Field<O>>(
  type: FieldType,
  Class: new (...args: any[]) => C,
) =>
  //
  (options: O = {} as O) =>
    //
    ({ constructor: { name: entity } }: any, name: string): void =>
      Field.add(new Class(entity, name, options, type))

export const makeSetDecoratorFactory = (type: FieldType.Set | FieldType.Enum) =>
  //
  (values: SetValues, tsName: SetTsName, options: SetOptions = {}) =>
    //
    ({ constructor: { name: entity } }: any, name: string): void =>
      SetField.add(new SetField(entity, name, values, tsName, options, type))
