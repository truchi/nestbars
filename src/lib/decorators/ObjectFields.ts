import {
  ObjectDecorator,
  ObjectDefinition,
  ObjectOptions,
} from '../../types/decorators'
import { ObjectField } from '../data/Field'

export const Object: ObjectDecorator =
  //
  (definition: ObjectDefinition, options: ObjectOptions = {}) =>
    //
    ({ constructor: { name: entity } }: any, name: string): void =>
      ObjectField.add(new ObjectField(entity, name, definition, options))
