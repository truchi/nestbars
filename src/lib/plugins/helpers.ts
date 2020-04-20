import * as HandleBars from 'handlebars'
import handlebarsHelpers from 'handlebars-helpers'
import {
  get,
  set,
  empty,
  del,
  has,
  insert,
  push,
  ensureExists,
  coalesce,
} from 'object-path'
import { Helpers } from '../../types/nestbars'
import { uncapitalize } from '../utils'

let SWITCHES: { value: any; break: boolean }[] = []
let VARS = {}
export const reset = (): void => void ((SWITCHES = []), (VARS = {}))

const helpers: Helpers = {
  ...handlebarsHelpers(),

  //
  // Blocks
  //

  switch(value: any, { fn }): string {
    SWITCHES.push({ value, break: false })
    const ret = fn(this)
    SWITCHES.pop()

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

  $call(o: object, fn: string, ...args: any[]): any {
    return o[fn](...args)
  },
  $get(path: string): any {
    return get(VARS, path)
  },
  $set(path: string, data: any): void {
    set(VARS, path, data)
  },
  $empty(path: string): void {
    empty(VARS, path)
  },
  $del(path: string): void {
    del(VARS, path)
  },
  $has(path: string): boolean {
    return has(VARS, path)
  },
  $insert(path: string, data: any, index: number): void {
    insert(VARS, path, data, index)
  },
  $push(path: string, data: any): void {
    push(VARS, path, data)
  },
  $ensureExists(path: string, dft: any): void {
    ensureExists(VARS, path, dft)
  },
  $coalesce(paths: string[], dft: any): void {
    coalesce(VARS, paths, dft)
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
