import { Field } from '../../lib/data/Field'
import entitiesField from '../entities/field'

export default (type: string, field: Field): object => ({
  ...entitiesField('entity', field),
})
