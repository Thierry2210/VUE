export declare const isExecute: any;
declare let vueImport: any;
export declare class StockEventsDirective extends vueImport {
    constructor();
    render(createElement: any): void;
    updated(): void;
    getTag(): string;
}
export declare const StockEventsPlugin: {
    name: string;
    install(Vue: any): void;
};
export declare class StockEventDirective extends vueImport {
    render(): void;
    getTag(): string;
}
export declare const StockEventPlugin: {
    name: string;
    install(Vue: any): void;
};
export {};
