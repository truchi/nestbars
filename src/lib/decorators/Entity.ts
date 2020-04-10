import { assign, pluralize, uncapitalize } from '../utils'
import { addEntity } from '../data'

export type EntityOptions = {
  name?: string
  implements?: string[]
  abstract?: boolean
  description?: string
  data?: object
}

const DEFAULTS: Required<EntityOptions> = {
  name: '',
  implements: [],
  abstract: false,
  description: '',
  data: {},
}

export function Entity(): Function
export function Entity(options: EntityOptions): Function
export function Entity(
  name: EntityOptions['name'],
  options: Omit<EntityOptions, 'name'>,
): Function

export function Entity(...args: any[]) {
  return ({ name: entity }: any): void => {
    let options: EntityOptions = DEFAULTS

    switch (args.length) {
      case 1:
        if (typeof args[0] === 'string') {
          options.name = args[0]
        } else {
          options = args[0]
        }
        break
      case 2:
        options = args[1]
        options.name = args[0]
        break
    }

    addEntity(
      entity,
      assign(DEFAULTS, options, {
        name: options.name || pluralize(uncapitalize(entity)),
      }),
    )
  }
}
