export declare const isExecute: any;
declare let vueImport: any;
export declare class RowsDirective extends vueImport {
    constructor();
    render(createElement: any): void;
    updated(): void;
    getTag(): string;
}
export declare const RowsPlugin: {
    name: string;
    install(Vue: any): void;
};
export declare class RowDirective extends vueImport {
    render(): void;
    getTag(): string;
}
export declare const RowPlugin: {
    name: string;
    install(Vue: any): void;
};
export {};
