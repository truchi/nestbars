import * as HandleBars from 'handlebars'
import { FieldType, FieldOptions } from '../../types/decorators'
import { relativeImport } from '../utils'
import { Entity } from '../data/Entity'
import { Field } from '../data/Field'

export type Context = {
  entities: Entity[]
  entity: Entity
}

const VARS: { [key: string]: any } = {}
const SWITCHES: { value: any; break: boolean }[] = []

export default {
  block: {
    wrap(this: Context, open: string, close: string, { fn }): string {
      const ret = fn(this)

      return ret.length ? open + ret + close : ''
    },
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
    stringify(o: string | object): HandleBars.SafeString {
      return new HandleBars.SafeString(
        typeof o === 'string' ? `'${o}'` : JSON.stringify(o),
      )
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
