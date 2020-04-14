import * as HandleBars from 'handlebars'
import { FieldOptions, FieldType } from '../../types/decorators'
import { relativeImport } from '../utils'
import { Entity } from '../data/Entity'
import { Field } from '../data/Field'

export type Context = {
  entities: Entity[]
  entity: Entity
}

export const helpers = {
  __noPrefix: {
    block: {
      wrap(open: string, close: string, { fn }): string {
        const ret = fn(this)
        return ret.length ? open + ret + close : ''
      },
    },
    fn: {
      stringify(o: object): HandleBars.SafeString {
        return new HandleBars.SafeString(JSON.stringify(o))
      },
      isEmpty(o: any[] | object): boolean {
        return !!(Array.isArray(o) ? o.length : Object.keys(o).length)
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
      hasEnums(this: Context): boolean {
        return this.entity.fields
          .filter(
            ({ type }) => type === FieldType.Enum || type === FieldType.Set,
          )
          .some(x => x)
      },
      fieldType(field: Field<FieldOptions>): string {
        return field.tsType()
      },
    },
  },
}
