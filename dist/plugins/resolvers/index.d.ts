import { PathFunction } from '../../types/utils';
import { Plugin } from '../../types/nestbars';
export declare type ResolverPluginOptions = {
    entities: string | PathFunction;
    dtos: string | PathFunction;
    services: string | PathFunction;
};
declare const _default: ({ entities: entitiesPath, dtos: dtosPath, services: servicesPath, }: ResolverPluginOptions) => Plugin;
export default _default;
