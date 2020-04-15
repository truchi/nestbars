import * as HandleBars from 'handlebars'
import { readFile, writeFile } from '../utils'
import { registerPartials, registerHelpers } from './utils'
import { Entity } from '../data/Entity'
import helpers from './helpers'

export type Context = {
  entities: Entity[]
  entity: Entity
}

const partials = [
  'banner',
  'entity/imports',
  'entity/enum',
  'entity/db_decorator',
  'entity/gql_decorator',
  'entity/field/field',
  'entity/field/primary_db_decorator',
  'entity/field/primary_gql_decorator',
  'entity/field/scalar_db_decorator',
  'entity/field/scalar_gql_decorator',
  'entity/field/set_db_decorator',
  'entity/field/set_gql_decorator',
  'entity/field/special_db_decorator',
  'entity/field/special_gql_decorator',
  'entity/field/relation_db_decorator',
  'entity/field/relation_gql_decorator',
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
