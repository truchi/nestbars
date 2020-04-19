import { pick } from '../../../lib/utils'
import { Entity } from '../../../lib/data/Entity'
import { FieldData } from './FieldData'

export class EntityData {
  readonly entity: Entity
  readonly fields: FieldData[]
  readonly dbDecorator = 'Entity'
  readonly gqlDecorator = 'ObjectType'
  readonly dbOptions: object
  readonly gqlOptions: object

  constructor(entity: Entity, readonly dest: string) {
    this.entity = entity

    const { fields, options } = entity
    this.fields = fields.map(field => new FieldData(field))
    this.dbOptions = Object.assign({}, pick(options, ['name']), options.options)
    this.gqlOptions = pick(options, ['description'])
  }
}
