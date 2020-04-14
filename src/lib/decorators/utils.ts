import {
  SetValues,
  SetTsName,
  SetOptions,
  SET_OPTIONS_DEFAULTS,
  FieldType,
} from '../../types/decorators'
import { assign } from '../utils'
import { Field, SetField } from '../data/Field'

export const makeFieldDecoratorFactory = <O extends {}, C extends Field<O>>(
  type: FieldType,
  Class: new (...args: any[]) => C,
  defaults: Required<O>,
) =>
  //
  (options: O = {} as O) =>
    //
    ({ constructor: { name: entity } }: any, name: string): void =>
      Field.add(new Class(entity, name, assign(defaults, options), type))

export const makeSetDecoratorFactory = (type: FieldType) =>
  //
  (values: SetValues, tsName: SetTsName, options: SetOptions = {}) =>
    //
    ({ constructor: { name: entity } }: any, name: string): void =>
      SetField.add(
        new SetField(
          entity,
          name,
          values,
          tsName,
          assign(SET_OPTIONS_DEFAULTS, options),
          type,
        ),
      )
