import { Class, PathFunction } from '../../types/utils'

export default (entities: Class[], dest: PathFunction) =>
  //
  () =>
    entities.reduce(
      (o, { name }) => ({ ...o, [name]: dest('entity', name) }),
      {},
    )
