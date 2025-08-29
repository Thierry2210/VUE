export declare const isExecute: any;
declare let vueImport: any;
export declare class BulletRangeCollectionDirective extends vueImport {
    constructor();
    render(createElement: any): void;
    updated(): void;
    getTag(): string;
}
export declare const BulletRangeCollectionPlugin: {
    name: string;
    install(Vue: any): void;
};
export declare class BulletRangeDirective extends vueImport {
    render(): void;
    getTag(): string;
}
export declare const BulletRangePlugin: {
    name: string;
    install(Vue: any): void;
};
export {};
