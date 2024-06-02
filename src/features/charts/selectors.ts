import { getChartId } from 'helpers';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from 'store';
import { Chart } from 'validators';

export const selectCharts = (state: RootState) => state.charts.charts;

export const selectChart = (
    state: RootState,
    id: string | undefined
): Chart | null => {
    if (!id) {
        return null;
    }
    const chart = state.charts.charts.find((c) => getChartId(c) === id);
    if (!chart) {
        return null;
    }
    return chart;
};

/**
 * Returns an array of filtered charts based on the provided name and specialty.
 * @param {Pick<Chart, 'name' | 'specialty'>} param - The name and specialty to filter the charts.
 * @returns {Chart[]} - The filtered charts.
 */
export const useFilteredCharts = ({
    name,
    specialty,
}: Pick<Chart, 'name' | 'specialty'>) => {
    const charts = useSelector(selectCharts);
    return useMemo(
        () =>
            charts.filter((c) => c.name === name && c.specialty === specialty),
        [charts, name, specialty]
    );
};
