import { PathFunction } from '../../types/utils';
import { Entity } from '../../lib/data/Entity';
import { EntityData } from './lib/EntityData';
declare const _default: (entities: Entity[], dest: PathFunction) => () => EntityData[];
export default _default;
