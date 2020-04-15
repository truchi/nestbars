import {
  PrimaryDecorator,
  PrimaryOptions,
  FieldType,
} from '../../types/decorators'
import { makeFieldDecoratorFactory } from './utils'
import { PrimaryField } from '../data/Field'

export const Id: PrimaryDecorator = makeFieldDecoratorFactory<
  PrimaryOptions,
  PrimaryField
>(FieldType.Id, PrimaryField)

export const Uuid: PrimaryDecorator = makeFieldDecoratorFactory<
  PrimaryOptions,
  PrimaryField
>(FieldType.Uuid, PrimaryField)
