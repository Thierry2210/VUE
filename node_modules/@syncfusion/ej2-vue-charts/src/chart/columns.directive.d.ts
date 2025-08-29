export declare const isExecute: any;
declare let vueImport: any;
export declare class ColumnsDirective extends vueImport {
    constructor();
    render(createElement: any): void;
    updated(): void;
    getTag(): string;
}
export declare const ColumnsPlugin: {
    name: string;
    install(Vue: any): void;
};
export declare class ColumnDirective extends vueImport {
    render(): void;
    getTag(): string;
}
export declare const ColumnPlugin: {
    name: string;
    install(Vue: any): void;
};
export {};
