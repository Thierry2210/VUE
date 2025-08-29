export declare const isExecute: any;
declare let vueImport: any;
export declare class TrendlinesDirective extends vueImport {
    constructor();
    render(createElement: any): void;
    updated(): void;
    getTag(): string;
}
export declare const TrendlinesPlugin: {
    name: string;
    install(Vue: any): void;
};
export declare class TrendlineDirective extends vueImport {
    render(): void;
    getTag(): string;
}
export declare const TrendlinePlugin: {
    name: string;
    install(Vue: any): void;
};
export {};
