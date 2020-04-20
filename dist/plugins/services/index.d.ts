import { Plugin } from '../../types/nestbars';
import { PathFunction } from '../../types/utils';
export declare type ServicePluginOptions = {
    entities: string | PathFunction;
};
declare const entity: ({ entities: entitiesPath }: ServicePluginOptions) => Plugin;
export default entity;
