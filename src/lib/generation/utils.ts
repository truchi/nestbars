import * as HandleBars from 'handlebars'
import { readFile, toSnake } from '../utils'

export const registerPartials = async (
  partials: string[],
  templatesPath: string,
) =>
  Promise.all(
    partials.map(async (partial: string) =>
      HandleBars.registerPartial(
        partial.replace('/', '__'),
        await readFile(`${templatesPath}/${partial}.hbs`),
      ),
    ),
  )

export const registerHelpers = (helpers: {
  global: { block: object; fn: object }
  entity: { block: object; fn: object }
}) =>
  Object.entries(helpers).map(([context, { block, fn }]) => {
    Object.entries(block).map(
      registerHelper(context === 'global' ? '' : `${context}__`),
    )
    Object.entries(fn).map(
      registerHelper(context === 'global' ? '$' : `$${context}__`),
    )
  })

const registerHelper = (prefix: string) =>
  //
  ([name, helper]: [string, (...args: any[]) => any]) => (
    console.log(prefix + toSnake(name)),
    HandleBars.registerHelper(prefix + toSnake(name), helper)
  )
