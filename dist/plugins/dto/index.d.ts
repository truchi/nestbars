import { Plugin } from '../../types/nestbars';
import { PathFunction } from '../../types/utils';
export declare type ServicePluginOptions = {
    entities: string | PathFunction;
};
declare const _default: ({ entities: entitiesPath }: ServicePluginOptions) => Plugin;
export default _default;
