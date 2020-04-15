import * as HandleBars from 'handlebars'
import { readFile } from '../utils'

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

export const registerHelpers = (helpers: object) =>
  Object.entries(
    helpers,
  ).map(([name, helper]: [string, (...args: any[]) => any]) =>
    HandleBars.registerHelper(name, helper),
  )
