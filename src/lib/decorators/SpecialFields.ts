import {
  SpecialDecorator,
  SpecialOptions,
  FieldType,
} from '../../types/decorators'
import { makeFieldDecoratorFactory } from './utils'
import { SpecialField } from '../data'

export const Created: SpecialDecorator = makeFieldDecoratorFactory<
  SpecialOptions,
  SpecialField
>(FieldType.Created, SpecialField)

export const Updated: SpecialDecorator = makeFieldDecoratorFactory<
  SpecialOptions,
  SpecialField
>(FieldType.Updated, SpecialField)

export const Version: SpecialDecorator = makeFieldDecoratorFactory<
  SpecialOptions,
  SpecialField
>(FieldType.Version, SpecialField)
