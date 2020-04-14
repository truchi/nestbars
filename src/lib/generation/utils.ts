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

export const registerHelpers = ({
  block,
  fn,
}: {
  block: object
  fn: object
}) => (
  Object.entries(block).map(registerHelper('')),
  Object.entries(fn).map(registerHelper('$'))
)

const registerHelper = (prefix: string) =>
  //
  ([name, helper]: [string, (...args: any[]) => any]) =>
    HandleBars.registerHelper(prefix + toSnake(name), helper)
