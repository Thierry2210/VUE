export declare const isExecute: any;
declare let vueImport: any;
export declare class IndicatorsDirective extends vueImport {
    constructor();
    render(createElement: any): void;
    updated(): void;
    getTag(): string;
}
export declare const IndicatorsPlugin: {
    name: string;
    install(Vue: any): void;
};
export declare class IndicatorDirective extends vueImport {
    render(): void;
    getTag(): string;
}
export declare const IndicatorPlugin: {
    name: string;
    install(Vue: any): void;
};
export {};
