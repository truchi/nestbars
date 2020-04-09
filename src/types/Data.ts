import { EntityArgs, FieldArgs } from '.'

export type Data = {
  [key: string]: {
    entity: string
    args: EntityArgs
    fields: {
      [key: string]: {
        field: string
        args: FieldArgs
      }
    }
  }
}
