import * as HandleBars from 'handlebars'
import { readFile, toSnake } from '../utils'

export const registerPartials = async (
  partials: string[],
  templatesPath: string,
) =>
  Promise.all(
    partials.map(async (partial: string) =>
      HandleBars.registerPartial(
        partial.replace(/\//g, '__'),
        await readFile(`${templatesPath}/${partial}.hbs`),
      ),
    ),
  )

export const registerHelpers = (helpers: {
  __noPrefix: { block: object; fn: object }
  entity: { block: object; fn: object }
}) =>
  Object.entries(helpers).map(([context, { block, fn }]) => {
    Object.entries(block).map(
      registerHelper(context === '__noPrefix' ? '' : `${context}__`),
    )
    Object.entries(fn).map(
      registerHelper(context === '__noPrefix' ? '$' : `$${context}__`),
    )
  })

const registerHelper = (prefix: string) =>
  //
  ([name, helper]: [string, (...args: any[]) => any]) =>
    HandleBars.registerHelper(prefix + toSnake(name), helper)
