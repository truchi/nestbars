import { Class, PathFunction } from './utils';
export declare type UserConfig = {
    entities: Class[];
    dest?: string | PathFunction | undefined;
    templates?: string | PathFunction;
};
