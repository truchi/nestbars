import { PathFunction } from '../types/utils';
export declare const readFile: (file: string) => Promise<string>;
export declare const writeFile: (file: string, content: string) => Promise<void>;
export declare const mkdir: (path: string) => Promise<string>;
export declare const toPathFunction: (o: string | PathFunction, { NAME, TYPE }: {
    NAME: string;
    TYPE: string;
}, path?: string) => PathFunction;
export declare const flat: (xs: any[][]) => any[];
export declare const unique: (xs: any[]) => any[];
export declare const defined: (xs: any[]) => any[];
export declare const assign: <T>(x: T, ...xs: object[]) => T;
export declare const uncapitalize: (s: string) => string;
export declare const objectDefinitionRecursion: (definition: object | any[], whenArray: (definition: any[], recur: (definition: object | any[]) => any) => any, whenObject: (definition: object, recur: (definition: object | any[]) => any) => any, whenString: (definition: string) => any, whenFunction: (definition: Function) => any) => any;
