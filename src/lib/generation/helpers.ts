import * as HandleBars from 'handlebars'
import { FieldType, FieldOptions } from '../../types/decorators'
import { relativeImport } from '../utils'
import { Entity } from '../data/Entity'
import { Field } from '../data/Field'
import { type } from 'os'

export type Context = {
  entities: Entity[]
  entity: Entity
}

const VARS: { [key: string]: any } = {}
const SWITCHES: { value: any; break: boolean }[] = []

export default {
  block: {
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
  },
  fn: {
    //
    // Variables & Functions
    //
    set(name: string, value: any): void {
      VARS[name] = value
    },
    get(name: string): any {
      return VARS[name]
    },
    delete(name: string): void {
      delete VARS[name]
    },
    call(o: object, fn: string, ...args: any[]): any {
      return o[fn](...args)
    },
    arr(...args: any[]): any[] {
      return args.slice(0, -1)
    },
    //
    // Utils
    //
    isEmpty(o: any[] | object): boolean {
      return !(Array.isArray(o)
        ? o.length
        : Object.entries(o).filter(([, v]) => v !== undefined && v !== null)
            .length)
    },
    isDefined(this: Context, o: any): boolean {
      return o !== undefined && o !== null
    },
    isTruthy(this: Context, o: any): boolean {
      return !!o
    },
    stringify(
      o: string | object,
      { hash: { except, trap } },
    ): HandleBars.SafeString {
      except = !!except ? (Array.isArray(except) ? except : [except]) : []
      trap = !!trap ? (Array.isArray(trap) ? trap : [trap]) : []

      let str = JSON.stringify(o)

      except.map(key => {
        str = str.replace(`\"${key}\":\"${o[key]}"`, `\"${key}\":${o[key]}`)
      })

      return new HandleBars.SafeString(trap.includes(str) ? '' : str)
    },
    relativeImport(from: string, to: string): string {
      return relativeImport(from, to)
    },
    //
    // Entity
    //
    enums(entity: Entity): Field<FieldOptions>[] {
      return entity.fields.filter(
        ({ type }) => type === FieldType.Enum || type === FieldType.Set,
      )
    },
    hasInts(entity: Entity): boolean {
      return !!entity.fieldsByType(FieldType.Int).length
    },
    hasFloats(entity: Entity): boolean {
      return !!entity.fieldsByType(FieldType.Float).length
    },
    hasEnums(entity: Entity): boolean {
      return !!entity.fieldsByType(FieldType.Enum, FieldType.Set).length
    },
  },
}
