export declare const isExecute: any;
declare let vueImport: any;
export declare class StockChartSeriesCollectionDirective extends vueImport {
    constructor();
    render(createElement: any): void;
    updated(): void;
    getTag(): string;
}
export declare const StockChartSeriesCollectionPlugin: {
    name: string;
    install(Vue: any): void;
};
export declare class StockChartSeriesDirective extends vueImport {
    render(): void;
    getTag(): string;
}
export declare const StockChartSeriesPlugin: {
    name: string;
    install(Vue: any): void;
};
export {};
