import {
  ObjectDecorator,
  ObjectDefinition,
  ObjectOptions,
  OBJECT_OPTIONS_DEFAULTS,
} from '../../types/decorators'
import { assign } from '../utils'
import { ObjectField } from '../data/Field'

export const Object: ObjectDecorator =
  //
  (definition: ObjectDefinition, options: ObjectOptions = {}) =>
    //
    ({ constructor: { name: entity } }: any, name: string): void =>
      ObjectField.add(
        new ObjectField(
          entity,
          name,
          definition,
          assign(OBJECT_OPTIONS_DEFAULTS, options),
        ),
      )
