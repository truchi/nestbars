import * as HandleBars from 'handlebars'
import handlebarsHelpers from 'handlebars-helpers'
import { Helpers } from '../../types/nestbars'
import { uncapitalize } from '../utils'

const SWITCHES: { value: any; break: boolean }[] = []

const helpers: Helpers = {
  ...handlebarsHelpers(),

  //
  // Blocks
  //

  switch(value: any, { fn }): string {
    SWITCHES.push({ value, break: false })
    const ret = fn(this)
    SWITCHES.pop()

    // TODO handle inverse
    return ret
  },
  case(...args: any[]): string {
    const { fn } = args.pop()
    const _switch = SWITCHES[SWITCHES.length - 1]

    return args.includes(_switch.value)
      ? ((_switch.break = true), fn(this))
      : ''
  },
  default({ fn }): string {
    return SWITCHES[SWITCHES.length - 1].break ? '' : fn(this)
  },

  //
  // Variables & Functions
  //

  call(o: object, fn: string, ...args: any[]): any {
    return o[fn](...args)
  },

  //
  // Utils
  //

  uncapitalize(str: string): string {
    return uncapitalize(str)
  },
  stringify(
    o: object,
    { hash: { trap = true, indent = 2 } },
  ): HandleBars.SafeString {
    if (trap && !Object.keys(o).length) return new HandleBars.SafeString('')

    return new HandleBars.SafeString(
      indent ? JSON.stringify(o, null, indent) : JSON.stringify(o),
    )
  },
}

export default helpers
