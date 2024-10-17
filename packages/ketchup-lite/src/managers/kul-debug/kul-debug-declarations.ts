import { KulGenericComponent } from '../../types/GenericTypes';
import { KulData } from '../kul-data/kul-data';
import { KulDates } from '../kul-dates/kul-dates';
import { KulDynamicPosition } from '../kul-dynamic-position/kul-dynamic-position';
import { KulLanguage } from '../kul-language/kul-language';
import { KulLLM } from '../kul-llm/kul-llm';
import { KulManager } from '../kul-manager/kul-manager';
import { KulMath } from '../kul-math/kul-math';
import { KulScrollOnHover } from '../kul-scroll-on-hover/kul-scroll-on-hover';
import { KulTheme } from '../kul-theme/kul-theme';
import { KulDebug } from './kul-debug';

export interface KulDebugComponentInfo {
    endTime: number;
    renderCount: number;
    renderEnd: number;
    renderStart: number;
    startTime: number;
}
export interface KulDebugLogFactory {
    dump: () => void;
    fromComponent(comp: KulDebugLogClass): comp is KulGenericComponent;
    new: (
        comp: KulDebugLogClass,
        message: string,
        category?: KulDebugCategory
    ) => Promise<void>;
    print: () => void;
}

export interface KulDebugLog {
    category: KulDebugCategory;
    class: KulDebugLogClass;
    date: Date;
    id: string;
    message: string;
    type: KulDebugLogType;
}
export type KulDebugLogToPrintEntry = {
    class: KulDebugLogClass;
    date: string;
    message: string;
};
export type KulDebugLogClass =
    | KulGenericComponent
    | KulData
    | KulDates
    | KulDebug
    | KulDynamicPosition
    | KulLanguage
    | KulLLM
    | KulManager
    | KulMath
    | KulScrollOnHover
    | KulTheme;
export type KulDebugLogsToPrint = {
    [index in KulDebugLogType]: KulDebugLogToPrintEntry[];
};
export type KulDebugCategory =
    | 'informational'
    | 'warning'
    | 'error'
    | 'success';
export type KulDebugLifecycles =
    | 'custom'
    | 'did-load'
    | 'did-render'
    | 'will-render';
export type KulDebugLogType = 'load' | 'misc' | 'render' | 'resize';
export interface KulDebugWidgetFactory {
    create: () => void;
    destroy: () => void;
    element: HTMLKulCardElement;
    initialize: () => void;
}
