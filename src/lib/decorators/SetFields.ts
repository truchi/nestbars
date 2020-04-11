import { SetType, SetOptions } from '../../types/decorators'
import { setDecorator } from './utils'
import { addSet } from '../data'

const DEFAULTS: Required<SetOptions> = {
  name: '',
  primary: false,
  default: undefined,
  description: '',
  deprecation: '',
  options: {},
}

export const Enum = setDecorator(SetType.Enum, DEFAULTS, addSet)
export const Set = setDecorator(SetType.Set, DEFAULTS, addSet)
