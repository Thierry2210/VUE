export declare const isExecute: any;
declare let vueImport: any;
export declare class SmithchartSeriesCollectionDirective extends vueImport {
    constructor();
    render(createElement: any): void;
    updated(): void;
    getTag(): string;
}
export declare const SmithchartSeriesCollectionPlugin: {
    name: string;
    install(Vue: any): void;
};
export declare class SmithchartSeriesDirective extends vueImport {
    render(): void;
    getTag(): string;
}
export declare const SmithchartSeriesPlugin: {
    name: string;
    install(Vue: any): void;
};
export {};
