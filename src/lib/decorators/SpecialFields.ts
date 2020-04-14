import {
  SpecialDecorator,
  SpecialOptions,
  SPECIAL_OPTIONS_DEFAULTS,
  FieldType,
} from '../../types/decorators'
import { makeFieldDecoratorFactory } from './utils'
import { SpecialField, ScalarField } from '../data/Field'

export const Created: SpecialDecorator = makeFieldDecoratorFactory<
  SpecialOptions,
  SpecialField
>(FieldType.Created, SpecialField, SPECIAL_OPTIONS_DEFAULTS)

export const Updated: SpecialDecorator = makeFieldDecoratorFactory<
  SpecialOptions,
  SpecialField
>(FieldType.Updated, ScalarField, SPECIAL_OPTIONS_DEFAULTS)

export const Version: SpecialDecorator = makeFieldDecoratorFactory<
  SpecialOptions,
  SpecialField
>(FieldType.Version, SpecialField, SPECIAL_OPTIONS_DEFAULTS)
