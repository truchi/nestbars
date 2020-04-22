import { Field } from '../../lib/data/Field'
import toOptions from './toOptions'
import toDecorator from './toDecorators'

export default (field: Field) => ({
  ...toDecorator(field),
  ...toOptions(field),
})
