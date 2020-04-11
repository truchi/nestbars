import { PrimaryType, PrimaryOptions } from '../../types/decorators'
import { fieldDecorator } from './utils'
import { addPrimary } from '../data'

const DEFAULTS: Required<PrimaryOptions> = {
  name: '',
  description: '',
  deprecation: '',
  options: {},
}

export const Id = fieldDecorator(PrimaryType.Id, DEFAULTS, addPrimary)
export const Uuid = fieldDecorator(PrimaryType.Uuid, DEFAULTS, addPrimary)
