import {
  SpecialDecorator,
  SpecialOptions,
  SPECIAL_OPTIONS_DEFAULTS,
  FieldType,
} from '../../types/decorators'
import { makeFieldDecoratorFactory } from './utils'

export const Created: SpecialDecorator = makeFieldDecoratorFactory<
  SpecialOptions
>(FieldType.Created, SPECIAL_OPTIONS_DEFAULTS)

export const Updated: SpecialDecorator = makeFieldDecoratorFactory<
  SpecialOptions
>(FieldType.Updated, SPECIAL_OPTIONS_DEFAULTS)

export const Version: SpecialDecorator = makeFieldDecoratorFactory<
  SpecialOptions
>(FieldType.Version, SPECIAL_OPTIONS_DEFAULTS)
