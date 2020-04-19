export declare class Data {
    data: {
        [key: string]: any;
    };
    set(data: any, ...keys: string[]): void;
    get(...keys: string[]): any;
    empty(): void;
}
