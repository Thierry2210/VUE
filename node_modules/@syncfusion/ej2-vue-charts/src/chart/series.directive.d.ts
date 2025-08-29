export declare const isExecute: any;
declare let vueImport: any;
export declare class SeriesCollectionDirective extends vueImport {
    constructor();
    render(createElement: any): void;
    updated(): void;
    getTag(): string;
}
export declare const SeriesCollectionPlugin: {
    name: string;
    install(Vue: any): void;
};
export declare class SeriesDirective extends vueImport {
    render(): void;
    getTag(): string;
}
export declare const SeriesPlugin: {
    name: string;
    install(Vue: any): void;
};
export {};
