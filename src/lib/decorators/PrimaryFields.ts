import {
  PrimaryDecorator,
  PrimaryOptions,
  PRIMARY_OPTIONS_DEFAULTS,
  FieldType,
} from '../../types/decorators'
import { makeFieldDecoratorFactory } from './utils'
import { PrimaryField } from '../data/Field'

export const Id: PrimaryDecorator = makeFieldDecoratorFactory<
  PrimaryOptions,
  PrimaryField
>(FieldType.Id, PrimaryField, PRIMARY_OPTIONS_DEFAULTS)

export const Uuid: PrimaryDecorator = makeFieldDecoratorFactory<
  PrimaryOptions,
  PrimaryField
>(FieldType.Uuid, PrimaryField, PRIMARY_OPTIONS_DEFAULTS)
