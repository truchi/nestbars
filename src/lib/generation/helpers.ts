import * as HandleBars from 'handlebars'
import { FieldOptions, FieldType } from '../../types/decorators'
import { relativeImport } from '../utils'
import { Entity } from '../data/Entity'
import { Field } from '../data/Field'

export type Context = {
  entities: Entity[]
  entity: Entity
}

export type Switch = {
  __switches?: {
    value: any
    break: boolean
  }[]
}

export const helpers = {
  __noPrefix: {
    block: {
      wrap(this: Context, open: string, close: string, { fn }): string {
        const ret = fn(this)

        return ret.length ? open + ret + close : ''
      },
      switch(this: Switch, value: any, { fn }): string {
        this.__switches = this.__switches ?? []
        this.__switches.push({ value, break: false })

        const ret = fn(this)
        this.__switches.pop()

        return ret
      },
      case(this: Switch, ...args: any[]): string {
        const { fn } = args.pop()
        const _switch = this.__switches[this.__switches.length - 1]

        return args.includes(_switch.value)
          ? ((_switch.break = true), fn(this))
          : ''
      },
      default(this: Switch, { fn }): string {
        return this.__switches[this.__switches.length - 1].break ? '' : fn(this)
      },
    },
    fn: {
      stringify(o: string | object): HandleBars.SafeString {
        return new HandleBars.SafeString(
          typeof o === 'string' ? `'${o}'` : JSON.stringify(o),
        )
      },
      isEmpty(o: any[] | object): boolean {
        return !!(Array.isArray(o) ? o.length : Object.keys(o).length)
      },
      isDefined(this: Context, o: any): boolean {
        return o !== undefined && o !== null
      },
      isTruthy(this: Context, o: any): boolean {
        return !!o
      },
    },
  },
  entity: {
    block: {
      dependencies(this: Context, { fn }): string {
        const { entity } = this
        const { dest } = entity

        return entity
          .dependencies()
          .map(entity =>
            fn({
              name: entity,
              from: relativeImport(dest, Entity.find(entity).dest),
            }),
          )
          .join('')
      },
      enums(this: Context, { fn }): string {
        return this.entity.fields
          .filter(
            ({ type }) => type === FieldType.Enum || type === FieldType.Set,
          )
          .map(fn)
          .join('')
      },
    },
    fn: {
      hasInts(this: Context): boolean {
        return !!this.entity.fieldsByType(FieldType.Int).length
      },
      hasFloats(this: Context): boolean {
        return !!this.entity.fieldsByType(FieldType.Float).length
      },
      hasEnums(this: Context): boolean {
        return !!this.entity.fieldsByType(FieldType.Enum, FieldType.Set).length
      },
      tsType(field: Field<FieldOptions>): string {
        return field.tsType()
      },
      dbOptions(field: Field<FieldOptions>): object {
        return field.dbOptions()
      },
      gqlOptions(field: Field<FieldOptions>): object {
        return field.gqlOptions()
      },
    },
  },
}
