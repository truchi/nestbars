import { EntityOptions, FieldOptions, FieldType } from '../../types/decorators'
import { flat, unique } from '../utils'
import { Field } from './Field'
// import { Config } from '../../types/Config'

export class Entity {
  static all: Entity[] = []

  dest: string
  templatePath: string
  fields: Field<FieldOptions>[] = []

  constructor(readonly name: string, readonly options: EntityOptions) {
    this.options.options = this.options.options ?? {}
  }

  dependencies(): Entity[] {
    return unique(
      flat(this.fields.map(field => field.dependencies())),
    ).map(name => Entity.find(name))
  }

  dbOptions(): object {
    return this.options.options
  }

  gqlOptions(): object {
    return { description: this.options.description || undefined }
  }

  fieldsByType(...types: FieldType[]): Field<FieldOptions>[] {
    return this.fields.filter(({ type }) => types.includes(type))
  }

  static add(entity: Entity) {
    Entity.all.push(entity)
  }

  static find(name: string): Entity | undefined {
    return Entity.all.find(entity => entity.name === name)
  }

  // static init(config: Config) {
  //   const map = Entity.all.reduce(
  //     (map, entity) =>
  //       ((
  //         dest = config.dest(entity.name, 'entity'),
  //         templatePath = config.templates(entity.name, 'entity'),
  //       ) => (
  //         (entity.dest = dest),
  //         (entity.templatePath = templatePath),
  //         {
  //           ...map,
  //           [entity.name]: entity,
  //         }
  //       ))(),
  //     {},
  //   )

  //   Field.all.map(field => map[field.entity].fields.push(field))

  //   return Entity.all
  // }
}
