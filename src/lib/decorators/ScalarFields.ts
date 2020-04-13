import {
  ScalarDecorator,
  ScalarOptions,
  SCALAR_OPTIONS_DEFAULTS,
  FieldType,
} from '../../types/decorators'
import { makeFieldDecoratorFactory } from './utils'

export const Int: ScalarDecorator = makeFieldDecoratorFactory<ScalarOptions>(
  FieldType.Int,
  SCALAR_OPTIONS_DEFAULTS,
)

export const Float: ScalarDecorator = makeFieldDecoratorFactory<ScalarOptions>(
  FieldType.Float,
  SCALAR_OPTIONS_DEFAULTS,
)

export const String: ScalarDecorator = makeFieldDecoratorFactory<ScalarOptions>(
  FieldType.String,
  SCALAR_OPTIONS_DEFAULTS,
)

export const Date: ScalarDecorator = makeFieldDecoratorFactory<ScalarOptions>(
  FieldType.Date,
  SCALAR_OPTIONS_DEFAULTS,
)

export const Boolean: ScalarDecorator = makeFieldDecoratorFactory<
  ScalarOptions
>(FieldType.Boolean, SCALAR_OPTIONS_DEFAULTS)
