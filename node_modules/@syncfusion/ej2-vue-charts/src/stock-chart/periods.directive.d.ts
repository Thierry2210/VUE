export declare const isExecute: any;
declare let vueImport: any;
export declare class StockChartPeriodsDirective extends vueImport {
    constructor();
    render(createElement: any): void;
    updated(): void;
    getTag(): string;
}
export declare const StockChartPeriodsPlugin: {
    name: string;
    install(Vue: any): void;
};
export declare class StockChartPeriodDirective extends vueImport {
    render(): void;
    getTag(): string;
}
export declare const StockChartPeriodPlugin: {
    name: string;
    install(Vue: any): void;
};
export {};
