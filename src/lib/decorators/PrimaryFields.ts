import {
  PrimaryDecorator,
  PrimaryOptions,
  PRIMARY_OPTIONS_DEFAULTS,
  FieldType,
} from '../../types/decorators'
import { makeFieldDecoratorFactory } from './utils'

export const Id: PrimaryDecorator = makeFieldDecoratorFactory<PrimaryOptions>(
  FieldType.Id,
  PRIMARY_OPTIONS_DEFAULTS,
)

export const Uuid: PrimaryDecorator = makeFieldDecoratorFactory<PrimaryOptions>(
  FieldType.Uuid,
  PRIMARY_OPTIONS_DEFAULTS,
)
