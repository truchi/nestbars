import { SpecialType, SpecialOptions } from '../../types/decorators'
import { fieldDecorator } from './utils'
import { addSpecial } from '../data'

const DEFAULTS: Required<SpecialOptions> = {
  name: '',
  primary: false,
  description: '',
  deprecation: '',
  options: {},
}

export const Created = fieldDecorator(SpecialType.Created, DEFAULTS, addSpecial)
export const Updated = fieldDecorator(SpecialType.Updated, DEFAULTS, addSpecial)
export const Version = fieldDecorator(SpecialType.Version, DEFAULTS, addSpecial)
