import {
    EChartsOption,
    LegendComponentOption,
    TooltipComponentOption,
    XAXisComponentOption,
    YAXisComponentOption,
} from 'echarts';
import { KulChartAdapterDesign } from '../kul-chart-declarations';

export const CHART_DESIGN: KulChartAdapterDesign = {
    axis: (adapter) => {
        const theme = adapter.get.design.theme;
        const axis: XAXisComponentOption | YAXisComponentOption = {
            axisLabel: {
                color: theme.textColor,
                fontFamily: theme.font,
            },
            axisLine: { lineStyle: { color: theme.textColor } },
            axisTick: { lineStyle: { color: theme.border } },
            splitLine: { lineStyle: { color: theme.border } },
        };
        return axis;
    },
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
    legend: (adapter) => {
        const chart = adapter.get.chart();
        if (chart.kulLegend === 'hidden') {
            return null;
        }

        const theme = adapter.get.design.theme;
        const data = Object.keys(adapter.get.y());
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
    tooltip: (adapter) => {
        const theme = adapter.get.design.theme;
        const tooltip: TooltipComponentOption = {
            backgroundColor: theme.backgroundColor,
            textStyle: {
                color: theme.textColor,
                fontFamily: theme.font,
            },
        };
        return tooltip;
    },
};
