import { promisify } from 'util'
import {
  readFile as _readFile,
  readdir as _readDir,
  writeFile as _writeFile,
  mkdir as _mkdir,
} from 'fs'
import { dirname, normalize } from 'path'
import { PathFunction } from '../types/utils'

//
// File system
//

export const readFile = (file: string) => promisify(_readFile)(file, 'utf8')

export const readDir = (dir: string) => promisify(_readDir)(dir, 'utf8')

export const writeFile = ((writeFile = promisify(_writeFile)) => (
  file: string,
  content: string,
) =>
  mkdir(dirname(file)) //
    .then(() => writeFile(file, content)))()

export const mkdir = (path: string) =>
  promisify(_mkdir)(path, { recursive: true })

//
// Array
//

export const flat = (xs: any[][]): any[] => [].concat(...xs)

export const unique = (xs: any[]): any[] =>
  xs.filter((x, i, xs) => xs.indexOf(x) === i)

//
// Object
//

export const uniqueBy = (key: string) => (xs: any[]): any[] =>
  xs.filter((x, i, xs) => xs.findIndex(y => x[key] === y[key]) === i)

export const assign = <T>(x: T, ...xs: object[]): T =>
  Object.assign.apply(Object, [{}, x, ...xs])

export const pick = <T extends object, K extends keyof T>(
  o: T,
  keys: K[],
): Partial<T> =>
  Object.entries(o).reduce(
    (o, [k, v]) => (keys.includes(k as K) ? { ...o, [k]: v } : o),
    {},
  )

export const rename = <T extends object, K extends keyof T>(
  o: T,
  names: { [key in K]: string },
): object =>
  Object.entries(o).reduce((o, [k, v]) => ({ ...o, [names[k] ?? k]: v }), {})

//
// String
//

export const uncapitalize = (s: string): string =>
  s.charAt(0).toLowerCase() + s.slice(1)

//
// Function
//

export const toPathFunction = (
  o: string | PathFunction,
  { NAME, TYPE }: { NAME: string; TYPE: string },
): PathFunction => {
  const fn = typeof o === 'string' ? ((() => o) as PathFunction) : o

  return (type?: string, name?: string): string =>
    normalize(
      fn(type, name)
        .replace(TYPE, type)
        .replace(NAME, name),
    )
}

//
// Typescript
//

export const assertNever = (x: never, file: string, reason: string): never => {
  throw new Error(
    `Missing case in ${file} (${reason}) for:\n${x}\n${JSON.stringify(
      x,
      null,
      2,
    )}`,
  )
}
