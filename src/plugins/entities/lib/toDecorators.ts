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
      case FieldType.OneToOne:
        return 'OneToOne'
      case FieldType.OneToMany:
        return 'OneToMany'
      case FieldType.ManyToOne:
        return 'ManyToOne'
      case FieldType.ManyToMany:
        return 'ManyToMany'
      default:
        return 'Column'
    }
  })(),
  gqlDecorator: 'Field',
})
