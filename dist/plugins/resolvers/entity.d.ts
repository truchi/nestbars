import { PathFunction } from '../../types/utils';
import { Entity } from '../../lib/data/Entity';
declare const _default: (entitiesPath: PathFunction, servicesPath: PathFunction, resolversPath: PathFunction) => (type: string, entity: Entity) => object;
export default _default;
