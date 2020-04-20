import { Plugin } from '../../types/nestbars';
import { PathFunction } from '../../types/utils';
export declare type ServiceOptions = {
    entities: string | PathFunction;
};
declare const entity: (options: ServiceOptions) => Plugin;
export default entity;
