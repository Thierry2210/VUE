export declare const isExecute: any;
declare let vueImport: any;
export declare class AccumulationSeriesCollectionDirective extends vueImport {
    constructor();
    render(createElement: any): void;
    updated(): void;
    getTag(): string;
}
export declare const AccumulationSeriesCollectionPlugin: {
    name: string;
    install(Vue: any): void;
};
export declare class AccumulationSeriesDirective extends vueImport {
    render(): void;
    getTag(): string;
}
export declare const AccumulationSeriesPlugin: {
    name: string;
    install(Vue: any): void;
};
export {};
