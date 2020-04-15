import { dirname, resolve } from 'path'
import { UserConfig } from './types/UserConfig'
import { sanitizeConfig } from './lib/config'
import { generate } from './lib/generation/generation'
import { Entity } from './lib/data/Entity'

import { ColumnOptions } from 'typeorm'

const a = true as ColumnOptions
console.log(a)

// Re-exports for user
export * from './lib/decorators'

const userRootPath = resolve()
const templatesPath = `${__dirname}/../src/templates`
const userSrcPath = dirname(process.argv[1])

export default async (userConfig: UserConfig) => {
  const config = await sanitizeConfig(
    userConfig,
    userRootPath,
    templatesPath,
    userSrcPath,
  )
  // console.log(config)

  await generate(Entity.init(config), templatesPath)
  // console.log(JSON.stringify(Entity.all, null, 2))
  // console.log('generated!!!!!')
}
