import {
    EChartsOption,
    LegendComponentOption,
    TooltipComponentOption,
    XAXisComponentOption,
    YAXisComponentOption,
} from 'echarts';
import { KulChartAdapterDesign } from '../kul-chart-declarations';

export const CHART_DESIGN: KulChartAdapterDesign = {
    //#region Opacity
    applyOpacity: (color, opacity) => `${color}${opacity}`,
    //#endregion

    //#region Axis
    axis: (adapter, axisType) => {
        const theme = adapter.get.design.theme;

        if (axisType === 'x') {
            return {
                axisLabel: {
                    hideOverlap: true,
                    color: theme.textColor,
                    fontFamily: theme.font,
                },
                axisLine: { lineStyle: { color: theme.textColor } },
                axisTick: { lineStyle: { color: theme.border } },
                splitLine: { lineStyle: { color: theme.border } },
                boundaryGap: '10%',
                grid: {
                    left: '10%',
                    right: '10%',
                    bottom: '10%',
                    top: '10%',
                    containLabel: true,
                },
            } as XAXisComponentOption;
        } else {
            return {
                axisLabel: {
                    hideOverlap: true,
                    color: theme.textColor,
                    fontFamily: theme.font,
                },
                axisLine: { lineStyle: { color: theme.textColor } },
                axisTick: { lineStyle: { color: theme.border } },
                splitLine: { lineStyle: { color: theme.border } },
                boundaryGap: '10%',
                grid: {
                    left: '10%',
                    right: '10%',
                    bottom: '10%',
                    top: '10%',
                    containLabel: true,
                },
            } as YAXisComponentOption;
        }
    },
    //#endregion

    //#region Colors
    colors: (adapter, count) => {
        const hex = (color: string) => {
            return adapter.get.manager().theme.colorCheck(color).hexColor;
        };

        const chart = adapter.get.chart();
        const manager = adapter.get.manager();
        const colorArray: string[] = [];

        if (chart.kulColors && chart.kulColors.length > 0) {
            colorArray.push(...chart.kulColors.map((c) => hex(c)));
        } else {
            let index = 1;
            let colorVar = `--kul-chart-color-${index}`;
            while (manager.theme.cssVars[colorVar]) {
                colorArray.push(hex(manager.theme.cssVars[colorVar]));
                index++;
                colorVar = `--kul-chart-color-${index}`;
            }
        }

        while (colorArray.length < count) {
            colorArray.push(manager.theme.randomColor(128));
        }

        return colorArray.slice(0, count);
    },
    //#endregion

    //#region Label
    label: (adapter) => {
        const theme = adapter.get.design.theme;
        const label: EChartsOption = {
            show: true,
            formatter: '{b|{b}}',
            rich: {
                b: {
                    color: theme.textColor,
                    fontFamily: theme.font,
                    textShadow: 'none',
                },
            },
            textShadowColor: 'transparent',
            textShadowOffsetX: 0,
            textShadowOffsetY: 0,
            textShadowBlur: 0,
        };
        return label;
    },
    //#endregion

    //#region Legend
    legend: (adapter) => {
        const chart = adapter.get.chart();
        if (chart.kulLegend === 'hidden') {
            return null;
        }

        const theme = adapter.get.design.theme;
        const data = adapter.get.seriesData().map((s) => s.name);
        const legend: LegendComponentOption = {
            data,
            [chart.kulLegend]: 0,
            textStyle: {
                color: theme.textColor,
                fontFamily: theme.font,
            },
        };
        return legend;
    },
    theme: {
        backgroundColor: '',
        border: '',
        dangerColor: '',
        font: '',
        successColor: '',
        textColor: '',
    },
    //#endregion

    //#region Tooltip
    tooltip: (adapter, formatter?) => {
        const theme = adapter.get.design.theme;
        const tooltip: TooltipComponentOption = {
            backgroundColor: theme.backgroundColor,
            formatter,
            textStyle: {
                color: theme.textColor,
                fontFamily: theme.font,
            },
        };
        return tooltip;
    },
    //#endregion
};
