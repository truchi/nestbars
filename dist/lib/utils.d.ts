import { PathFunction } from '../types/utils';
export declare const readFile: (file: string) => Promise<string>;
export declare const readDir: (dir: string) => Promise<string[]>;
export declare const writeFile: (file: string, content: string) => Promise<void>;
export declare const mkdir: (path: string) => Promise<string>;
export declare const flat: (xs: any[][]) => any[];
export declare const unique: (xs: any[]) => any[];
export declare const uniqueBy: (key: string) => (xs: any[]) => any[];
export declare const assign: <T>(x: T, ...xs: object[]) => T;
export declare const pick: <T extends object, K extends keyof T>(o: T, keys: K[]) => Partial<T>;
export declare const rename: <T extends object, K extends keyof T>(o: T, names: { [key in K]: string; }) => object;
export declare const uncapitalize: (s: string) => string;
export declare const toPathFunction: (o: string | PathFunction, { NAME, TYPE }: {
    NAME: string;
    TYPE: string;
}) => PathFunction;
export declare const assertNever: (x: never, file: string, reason: string) => never;
