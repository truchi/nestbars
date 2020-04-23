import { Field } from '../../lib/data/Field'
import toOptions from './toOptions'
import toDecorator from './toDecorators'

export default (type: string, field: Field) => ({
  ...toDecorator(field),
  ...toOptions(field),
})
