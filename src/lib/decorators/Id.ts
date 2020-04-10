import { assign } from '../utils'
import { addId } from '../data'

export type IdOptions = {
  type?: 'id' | 'uuid'
  name?: string
  description?: string
  options?: object
  data?: object
}

const DEFAULTS: Required<IdOptions> = {
  type: 'id',
  name: '',
  description: '',
  options: {},
  data: {},
}

export function Id(): Function
export function Id(options: Omit<IdOptions, 'type'>): Function
export function Id(type: 'uuid', options: Omit<IdOptions, 'type'>): Function

export function Id(...args: any[]) {
  return ({ constructor: { name: entity } }: any, field: string): void => {
    let options: IdOptions = DEFAULTS

    switch (args.length) {
      case 1:
        if (args[0] === 'uuid') {
          options.type = args[0]
        } else {
          options = args[0]
        }
        break
      case 2:
        options = args[1]
        options.type = args[0]
        break
    }

    addId(entity, field, assign(DEFAULTS, options))
  }
}
