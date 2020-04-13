import { SetDecorator, FieldType } from '../../types/decorators'
import { makeSetDecoratorFactory } from './utils'

export const Enum: SetDecorator = makeSetDecoratorFactory(FieldType.Enum)

export const Set: SetDecorator = makeSetDecoratorFactory(FieldType.Enum)
