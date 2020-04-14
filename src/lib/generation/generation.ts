import * as HandleBars from 'handlebars'
import { readFile, writeFile } from '../utils'
import { registerPartials, registerHelpers } from './utils'
import { Entity } from '../data/Entity'
import { helpers } from './helpers'

export type Context = {
  entities: Entity[]
  entity: Entity
}

const partials = [
  'banner',
  'entity/imports',
  'entity/field/field',
  'entity/field/object_field_decorator',
  'entity/field/object_column_decorator',
  'entity/field/scalar_field_decorator',
  'entity/field/scalar_column_decorator',
  'entity/enum',
  'entity/entity_decorator',
  'entity/object_type_decorator',
]

export const generate = async (entities: Entity[], templatesPath: string) => {
  await registerPartials(partials, templatesPath)
  registerHelpers(helpers)

  await Promise.all(
    entities.map(async entity => {
      const { dest, templatePath } = entity
      await writeFile(
        dest,
        HandleBars.compile(await readFile(templatePath))({
          entities: Entity.all,
          entity,
        } as Context),
      )
    }),
  )
}
