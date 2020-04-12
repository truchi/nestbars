import { assign } from '../utils'

export const fieldDecorator = <Options extends object, Type extends any>(
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

export const setDecorator = <
  Options extends object,
  Type extends any,
  Values,
  TsName
>(
  type: Type,
  defaults: Required<Options>,
  add: (
    entity: string,
    field: string,
    type: Type,
    values: Values,
    tsName: TsName,
    options: Required<Options>,
  ) => void,
) =>
  //
  (values: Values, tsName: TsName, options: Options = {} as Options) =>
    //
    ({ constructor: { name: entity } }: any, field: string): void =>
      add(entity, field, type, values, tsName, assign(defaults, options))

export const objectDecorator = <
  Options extends object,
  Type extends any,
  Definition
>(
  type: Type,
  defaults: Required<Options>,
  add: (
    entity: string,
    field: string,
    type: Type,
    definition: Definition,
    options: Required<Options>,
  ) => void,
) =>
  //
  (definition: Definition, options: Options = {} as Options) =>
    //
    ({ constructor: { name: entity } }: any, field: string): void =>
      add(entity, field, type, definition, assign(defaults, options))
