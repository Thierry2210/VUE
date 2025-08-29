export declare const isExecute: any;
declare let vueImport: any;
export declare class MultiLevelLabelsDirective extends vueImport {
    constructor();
    render(createElement: any): void;
    updated(): void;
    getTag(): string;
}
export declare const MultiLevelLabelsPlugin: {
    name: string;
    install(Vue: any): void;
};
export declare class MultiLevelLabelDirective extends vueImport {
    render(): void;
    getTag(): string;
}
export declare const MultiLevelLabelPlugin: {
    name: string;
    install(Vue: any): void;
};
export {};
