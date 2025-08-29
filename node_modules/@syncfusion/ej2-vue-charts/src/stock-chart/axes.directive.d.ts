export declare const isExecute: any;
declare let vueImport: any;
export declare class StockChartAxesDirective extends vueImport {
    constructor();
    render(createElement: any): void;
    updated(): void;
    getTag(): string;
}
export declare const StockChartAxesPlugin: {
    name: string;
    install(Vue: any): void;
};
export declare class StockChartAxisDirective extends vueImport {
    render(): void;
    getTag(): string;
}
export declare const StockChartAxisPlugin: {
    name: string;
    install(Vue: any): void;
};
export {};
