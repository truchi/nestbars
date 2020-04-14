import {
  ScalarDecorator,
  ScalarOptions,
  SCALAR_OPTIONS_DEFAULTS,
  FieldType,
} from '../../types/decorators'
import { makeFieldDecoratorFactory } from './utils'
import { ScalarField } from '../data/Field'

export const Int: ScalarDecorator = makeFieldDecoratorFactory<
  ScalarOptions,
  ScalarField
>(FieldType.Int, ScalarField, SCALAR_OPTIONS_DEFAULTS)

export const Float: ScalarDecorator = makeFieldDecoratorFactory<
  ScalarOptions,
  ScalarField
>(FieldType.Float, ScalarField, SCALAR_OPTIONS_DEFAULTS)

export const String: ScalarDecorator = makeFieldDecoratorFactory<
  ScalarOptions,
  ScalarField
>(FieldType.String, ScalarField, SCALAR_OPTIONS_DEFAULTS)

export const Date: ScalarDecorator = makeFieldDecoratorFactory<
  ScalarOptions,
  ScalarField
>(FieldType.Date, ScalarField, SCALAR_OPTIONS_DEFAULTS)

export const Boolean: ScalarDecorator = makeFieldDecoratorFactory<
  ScalarOptions,
  ScalarField
>(FieldType.Boolean, ScalarField, SCALAR_OPTIONS_DEFAULTS)
