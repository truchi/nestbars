import { PathFunction } from '../../types/utils';
import { Plugin } from '../../types/nestbars';
export declare type ResolverPluginOptions = {
    entities: string | PathFunction;
    services: string | PathFunction;
};
declare const entity: ({ entities: entitiesDest, services: servicesDest, }: ResolverPluginOptions) => Plugin;
export default entity;
