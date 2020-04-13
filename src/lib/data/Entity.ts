import { EntityOptions, FieldOptions } from '../../types/decorators'
import { Field } from './Field'
import { Config } from 'src/types/Config'
import { flat, unique, relativeImport } from '../utils'

export class Entity {
  static all: Entity[] = []

  dest: string
  templatePath: string
  fields: Field<FieldOptions>[] = []

  constructor(
    readonly name: string,
    readonly options: Required<EntityOptions>,
  ) {}

  relative(entity: Entity): string {
    return relativeImport(this.dest, entity.dest)
  }

  dependencies(): string[] {
    return unique(flat(this.fields.map(field => field.dependencies())))
  }

  static add(entity: Entity) {
    Entity.all.push(entity)
  }

  static init(config: Config) {
    const map = Entity.all.reduce(
      (map, entity) =>
        ((
          dest = config.dest(entity.name, 'entity'),
          templatePath = config.templates(entity.name, 'entity'),
        ) => (
          (entity.dest = dest),
          (entity.templatePath = templatePath),
          {
            ...map,
            [entity.name]: entity,
          }
        ))(),
      {},
    )

    Field.all.map(field => map[field.entity].fields.push(field))
  }
}
