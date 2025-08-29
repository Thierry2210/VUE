export declare const isExecute: any;
declare let vueImport: any;
export declare class StockChartRowsDirective extends vueImport {
    constructor();
    render(createElement: any): void;
    updated(): void;
    getTag(): string;
}
export declare const StockChartRowsPlugin: {
    name: string;
    install(Vue: any): void;
};
export declare class StockChartRowDirective extends vueImport {
    render(): void;
    getTag(): string;
}
export declare const StockChartRowPlugin: {
    name: string;
    install(Vue: any): void;
};
export {};
