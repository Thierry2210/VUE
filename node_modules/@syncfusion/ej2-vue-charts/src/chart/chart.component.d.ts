import { ComponentBase } from '@syncfusion/ej2-vue-base';
export declare const properties: string[];
export declare const modelProps: string[];
export declare const testProp: any;
export declare const props: any;
export declare const watch: any;
export declare const emitProbs: any;
export declare const isExecute: any;
/**
 * Represents Vuejs chart Component
 * ```vue
 * <ejs-chart></ejs-chart>
 * ```
 */
export declare class ChartComponent extends ComponentBase {
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
    addAxes(axisCollection: Object[]): void;
    addSeries(seriesCollection: Object[]): void;
    clearSeries(): void;
    createChartSvg(): void;
    export(type: Object, fileName: string): void;
    getLocalizedLabel(key: string): string;
    print(id?: string[] | string | Object): void;
    processData(render: boolean): void;
    refreshLiveData(): void;
    removeAxis(index: number): void;
    removeSeries(index: number): void;
    setAnnotationValue(annotationIndex: number, content: string): void;
}
export declare const ChartPlugin: {
    name: string;
    install(Vue: any): void;
};
