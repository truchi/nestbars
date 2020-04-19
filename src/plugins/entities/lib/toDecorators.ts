import { FieldType } from '../../../types/decorators'

type Decorators = {
  dbDecorator: string
  gqlDecorator: string
}

export default (type: FieldType): Decorators => ({
  dbDecorator: (() => {
    switch (type) {
      case FieldType.Id:
      case FieldType.Uuid:
        return 'PrimaryGeneratedColumn'
      case FieldType.Created:
        return 'CreateDateColumn'
      case FieldType.Updated:
        return 'UpdateDateColumn'
      case FieldType.Version:
        return 'VersionColumn'
      default:
        return 'Column'
    }
  })(),
  gqlDecorator: 'Field',
})
