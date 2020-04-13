import * as HandleBars from 'handlebars'
import { FieldOptions } from '../types/decorators'
import { readFile, writeFile, relativeImport } from './utils'
import { Entity } from './data/Entity'
import { Field } from './data/Field'

export type Context = {
  entities: Entity[]
  entity: Entity
}

const partials = ['field']

const helpers = {
  $imports(this: Context, { fn }) {
    const { entity } = this
    const { dest } = entity

    return entity
      .dependencies()
      .map(entity =>
        fn({
          name: entity,
          dest: relativeImport(dest, Entity.find(entity).dest),
        }),
      )
      .join('')
  },
  $fieldType(field: Field<FieldOptions>) {
    return field.tsType()
  },
}

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

const registerPartials = async (partials: string[], templatesPath: string) =>
  Promise.all(
    partials.map(async (partial: string) =>
      HandleBars.registerPartial(
        partial,
        await readFile(`${templatesPath}/partials/${partial}.ts.hbs`),
      ),
    ),
  )

const registerHelpers = (helpers: any) =>
  Object.entries(helpers).map(registerHelper)

const registerHelper = ([name, helper]: [string, (...args: any[]) => any]) =>
  HandleBars.registerHelper(name, helper)
