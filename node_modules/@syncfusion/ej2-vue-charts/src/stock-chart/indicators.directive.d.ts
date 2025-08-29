export declare const isExecute: any;
declare let vueImport: any;
export declare class StockChartIndicatorsDirective extends vueImport {
    constructor();
    render(createElement: any): void;
    updated(): void;
    getTag(): string;
}
export declare const StockChartIndicatorsPlugin: {
    name: string;
    install(Vue: any): void;
};
export declare class StockChartIndicatorDirective extends vueImport {
    render(): void;
    getTag(): string;
}
export declare const StockChartIndicatorPlugin: {
    name: string;
    install(Vue: any): void;
};
export {};
