import { ComponentBase } from '@syncfusion/ej2-vue-base';
export declare const properties: string[];
export declare const modelProps: string[];
export declare const testProp: any;
export declare const props: any;
export declare const watch: any;
export declare const emitProbs: any;
export declare const isExecute: any;
/**
 * Represents Vuejs BulletChart Component
 * ```vue
 * <ejs-bulletchart></ejs-bulletchart>
 * ```
 */
export declare class BulletChartComponent extends ComponentBase {
    ej2Instances: any;
    propKeys: string[];
    models: string[];
    hasChildDirective: boolean;
    protected hasInjectedModules: boolean;
    tagMapper: {
        [key: string]: Object;
    };
    tagNameMapper: Object;
    isVue3: boolean;
    templateCollection: any;
    constructor();
    clearTemplate(templateNames?: string[]): any;
    setProperties(prop: any, muteOnChange: boolean): void;
    trigger(eventName: string, eventProp: {
        [key: string]: Object;
    }, successHandler?: Function): void;
    render(createElement: any): any;
    custom(): void;
    createSvg(chart: Object): void;
    export(type: Object, fileName: string, orientation?: Object, controls?: undefined[], width?: number, height?: number, isVertical?: boolean): void;
    print(id?: string[] | string | Object): void;
    removeSvg(): void;
}
export declare const BulletChartPlugin: {
    name: string;
    install(Vue: any): void;
};
