import { promisify } from 'util'
import { readFile as _readFile } from 'fs'
import { resolve } from 'path'
import { PathFunction } from '../types'

export const readFile = (file: string) =>
  promisify(_readFile)(file, 'utf8').then(content => ({ file, content }))

export const toPathFunction = (
  o: string | PathFunction,
  { NAME, TYPE }: { NAME: string; TYPE: string },
  path = '',
): PathFunction =>
  //
  (name: string, type: string) =>
    resolve(
      path,
      typeof o === 'string'
        ? //
          o.replace(NAME, name).replace(TYPE, type)
        : o(name, type),
    )

export const assign = <T>(x: T, ...xs: object[]): T =>
  Object.assign.apply(Object, [{}, x, ...xs])

export const pluralize = (s: string): string => s + 's'

export const uncapitalize = (s: string): string =>
  s.charAt(0).toLowerCase() + s.slice(1)
