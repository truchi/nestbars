import { ObjectType, ObjectOptions } from '../../types/decorators'
import { objectDecorator } from './utils'
import { addObject } from '../data'

const DEFAULTS: Required<ObjectOptions> = {
  name: '',
  primary: false,
  unique: false,
  nullable: false,
  default: undefined,
  description: '',
  deprecation: '',
  options: {},
}

export const Object = objectDecorator(ObjectType.Object, DEFAULTS, addObject)
