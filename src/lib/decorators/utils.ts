import { assign } from '../utils'

export const fieldDecorator = <
  Options extends object = object,
  Type extends any = any
>(
  type: Type,
  defaults: Required<Options>,
  add: (
    entity: string,
    field: string,
    type: Type,
    options: Required<Options>,
  ) => void,
) =>
  //
  (options: Options = {} as Options) =>
    //
    ({ constructor: { name: entity } }: any, field: string): void =>
      add(entity, field, type, assign(defaults, options))

export const setDecorator = <Options extends object, Type extends any>(
  type: Type,
  defaults: Required<Options>,
  add: (
    entity: string,
    field: string,
    type: Type,
    values: string[],
    tsName: string,
    options: Required<Options>,
  ) => void,
) =>
  //
  (values: string[], tsName: string, options: Options = {} as Options) =>
    //
    ({ constructor: { name: entity } }: any, field: string): void =>
      add(entity, field, type, values, tsName, assign(defaults, options))
