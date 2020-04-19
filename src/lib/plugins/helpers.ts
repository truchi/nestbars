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
    o: string | object,
    { hash: { except, trap } },
  ): HandleBars.SafeString {
    except = !!except ? (Array.isArray(except) ? except : [except]) : []
    trap = !!trap ? (Array.isArray(trap) ? trap : [trap]) : []
    trap = trap.map(s => s.trim())

    let str = JSON.stringify(o)
    except.map(key => {
      str = str.replace(`\"${key}\":\"${o[key]}"`, `\"${key}\":${o[key]}`)
    })
    str = trap.includes(str.trim()) ? '' : str

    return new HandleBars.SafeString(str)
  },
}

export default helpers
