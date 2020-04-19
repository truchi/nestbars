export declare class Data {
    data: {
        [key: string]: any;
    };
    set(name: string, data: any): void;
    get(name: string): any;
    empty(): void;
}
