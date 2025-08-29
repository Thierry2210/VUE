export declare const isExecute: any;
declare let vueImport: any;
export declare class StripLinesDirective extends vueImport {
    constructor();
    render(createElement: any): void;
    updated(): void;
    getTag(): string;
}
export declare const StripLinesPlugin: {
    name: string;
    install(Vue: any): void;
};
export declare class StripLineDirective extends vueImport {
    render(): void;
    getTag(): string;
}
export declare const StripLinePlugin: {
    name: string;
    install(Vue: any): void;
};
export {};
