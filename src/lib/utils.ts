import { promisify } from 'util'
import {
  readFile as _readFile,
  writeFile as _writeFile,
  mkdir as _mkdir,
} from 'fs'
import { dirname, parse, relative, resolve } from 'path'
import { PathFunction } from '../types/utils'

export const readFile = (file: string) => promisify(_readFile)(file, 'utf8')

export const writeFile = ((writeFile = promisify(_writeFile)) => (
  file: string,
  content: string,
) =>
  mkdir(dirname(file)) //
    .then(() => writeFile(file, content)))()

export const mkdir = (path: string) =>
  promisify(_mkdir)(path, { recursive: true })

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
        ? o.replace(NAME, name).replace(TYPE, type)
        : o(name, type),
    )

export const flat = (xs: any[][]): any[] => [].concat(...xs)

export const unique = (xs: any[]): any[] =>
  xs.filter((x, i, xs) => xs.indexOf(x) === i)

export const defined = (xs: any[]): any[] => xs.filter(x => x)

export const assign = <T>(x: T, ...xs: object[]): T =>
  Object.assign.apply(Object, [{}, x, ...xs])

export const pluralize = (s: string): string => s + 's'

export const uncapitalize = (s: string): string =>
  s.charAt(0).toLowerCase() + s.slice(1)

export const objectDefinitionRecursion = (
  definition: any[] | object,
  whenArray: (
    definition: any[],
    recur: (definition: any[] | object) => any,
  ) => any,
  whenObject: (
    definition: object,
    recur: (definition: any[] | object) => any,
  ) => any,
  whenString: (definition: string) => any,
  whenFunction: (definition: Function) => any,
) => {
  const recur = (definition: any[] | object) => {
    if (typeof definition === 'string') {
      return whenString(definition)
    } else if (typeof definition === 'function') {
      return whenFunction(definition)
    }

    return Array.isArray(definition)
      ? whenArray(definition, recur)
      : whenObject(definition, recur)
  }

  return recur(definition)
}
