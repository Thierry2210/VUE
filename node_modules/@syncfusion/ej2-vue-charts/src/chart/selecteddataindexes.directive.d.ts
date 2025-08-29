export declare const isExecute: any;
declare let vueImport: any;
export declare class SelectedDataIndexesDirective extends vueImport {
    constructor();
    render(createElement: any): void;
    updated(): void;
    getTag(): string;
}
export declare const SelectedDataIndexesPlugin: {
    name: string;
    install(Vue: any): void;
};
export declare class SelectedDataIndexDirective extends vueImport {
    render(): void;
    getTag(): string;
}
export declare const SelectedDataIndexPlugin: {
    name: string;
    install(Vue: any): void;
};
export {};
