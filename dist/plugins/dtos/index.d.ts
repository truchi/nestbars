import { Plugin } from '../../types/nestbars';
import { PathFunction } from '../../types/utils';
export declare type DtoPluginOptions = {
    entities: string | PathFunction;
};
declare const _default: ({ entities: entitiesPath }: DtoPluginOptions) => Plugin;
export default _default;
