import { ScalarType, ScalarOptions } from '../../types/decorators'
import { fieldDecorator } from './utils'
import { addScalar } from '../data'

const DEFAULTS: Required<ScalarOptions> = {
  name: '',
  primary: false,
  unique: false,
  nullable: false,
  default: undefined,
  description: '',
  deprecation: '',
  options: {},
}

export const Int = fieldDecorator(ScalarType.Int, DEFAULTS, addScalar)
export const Float = fieldDecorator(ScalarType.Float, DEFAULTS, addScalar)
export const String = fieldDecorator(ScalarType.String, DEFAULTS, addScalar)
export const Date = fieldDecorator(ScalarType.Date, DEFAULTS, addScalar)
export const Boolean = fieldDecorator(ScalarType.Boolean, DEFAULTS, addScalar)
