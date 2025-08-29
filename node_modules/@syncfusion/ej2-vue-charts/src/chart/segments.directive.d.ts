export declare const isExecute: any;
declare let vueImport: any;
export declare class SegmentsDirective extends vueImport {
    constructor();
    render(createElement: any): void;
    updated(): void;
    getTag(): string;
}
export declare const SegmentsPlugin: {
    name: string;
    install(Vue: any): void;
};
export declare class SegmentDirective extends vueImport {
    render(): void;
    getTag(): string;
}
export declare const SegmentPlugin: {
    name: string;
    install(Vue: any): void;
};
export {};
