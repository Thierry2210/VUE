export declare const isExecute: any;
declare let vueImport: any;
export declare class StockChartTrendlinesDirective extends vueImport {
    constructor();
    render(createElement: any): void;
    updated(): void;
    getTag(): string;
}
export declare const StockChartTrendlinesPlugin: {
    name: string;
    install(Vue: any): void;
};
export declare class StockChartTrendlineDirective extends vueImport {
    render(): void;
    getTag(): string;
}
export declare const StockChartTrendlinePlugin: {
    name: string;
    install(Vue: any): void;
};
export {};
