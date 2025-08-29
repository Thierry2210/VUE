export declare const isExecute: any;
declare let vueImport: any;
export declare class AccumulationAnnotationsDirective extends vueImport {
    constructor();
    render(createElement: any): void;
    updated(): void;
    getTag(): string;
}
export declare const AccumulationAnnotationsPlugin: {
    name: string;
    install(Vue: any): void;
};
export declare class AccumulationAnnotationDirective extends vueImport {
    render(): void;
    getTag(): string;
}
export declare const AccumulationAnnotationPlugin: {
    name: string;
    install(Vue: any): void;
};
export {};
