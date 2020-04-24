import { Plugin } from '../../types/nestbars';
import { PathFunction } from '../../types/utils';
export declare type ServicePluginOptions = {
    entities: string | PathFunction;
    dtos: string | PathFunction;
};
declare const _default: ({ entities: entitiesPath, dtos: dtosPath, }: ServicePluginOptions) => Plugin;
export default _default;
