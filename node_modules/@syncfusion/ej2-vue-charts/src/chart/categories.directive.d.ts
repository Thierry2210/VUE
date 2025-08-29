export declare const isExecute: any;
declare let vueImport: any;
export declare class CategoriesDirective extends vueImport {
    constructor();
    render(createElement: any): void;
    updated(): void;
    getTag(): string;
}
export declare const CategoriesPlugin: {
    name: string;
    install(Vue: any): void;
};
export declare class CategoryDirective extends vueImport {
    render(): void;
    getTag(): string;
}
export declare const CategoryPlugin: {
    name: string;
    install(Vue: any): void;
};
export {};
