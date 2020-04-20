import { Plugin } from '../../types/nestbars';
import { PathFunction } from '../../types/utils';
export declare type ServicePluginOptions = {
    entities: string | PathFunction;
};
declare const entity: ({ entities: entitiesDest }: ServicePluginOptions) => Plugin;
export default entity;
