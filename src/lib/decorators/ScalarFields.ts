import {
  ScalarDecorator,
  ScalarOptions,
  FieldType,
} from '../../types/decorators'
import { makeFieldDecoratorFactory } from './utils'
import { ScalarField } from '../data'

export const Int: ScalarDecorator = makeFieldDecoratorFactory<
  ScalarOptions,
  ScalarField
>(FieldType.Int, ScalarField)

export const Float: ScalarDecorator = makeFieldDecoratorFactory<
  ScalarOptions,
  ScalarField
>(FieldType.Float, ScalarField)

export const String: ScalarDecorator = makeFieldDecoratorFactory<
  ScalarOptions,
  ScalarField
>(FieldType.String, ScalarField)

export const Date: ScalarDecorator = makeFieldDecoratorFactory<
  ScalarOptions,
  ScalarField
>(FieldType.Date, ScalarField)

export const Boolean: ScalarDecorator = makeFieldDecoratorFactory<
  ScalarOptions,
  ScalarField
>(FieldType.Boolean, ScalarField)
