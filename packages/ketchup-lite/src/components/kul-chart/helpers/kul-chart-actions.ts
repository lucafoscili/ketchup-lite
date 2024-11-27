import { ECElementEvent } from 'echarts';
import { KulChartAdapter } from '../kul-chart-declarations';

//#region Click
export const onClick = (adapter: KulChartAdapter, e: ECElementEvent) => {
    const chart = adapter.get.chart();
    const dataset = chart.kulData;
    const seriesName = e.seriesName;
    const dataIndex = e.dataIndex;
    const node = dataset?.nodes?.[dataIndex] || {
        id: '*NOTFOUND*',
    };
    const column = adapter.get.seriesColumn(seriesName)?.[0] || {
        id: '*NOTFOUND*',
        title: seriesName,
    };
    const xValue = e.name;
    let yValue: string | number =
        typeof e.value !== 'number' && typeof e.value !== 'string'
            ? String(e.value).valueOf()
            : e.value;

    if (typeof yValue !== 'string' && typeof yValue !== 'number') {
        yValue = String(yValue);
    }

    adapter.emit.event('click', {
        column,
        node,
        x: xValue,
        y: yValue,
    });
};
//#endregion
