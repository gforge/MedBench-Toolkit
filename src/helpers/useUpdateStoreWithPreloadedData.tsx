import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import packageJson from '../../package.json'; // Adjust the path accordingly
import { charts4summaryActions, selectSummaryCharts } from '../features';
import { loadData } from './loadData';

export const useUpdateStoreWithPreloadedData = () => {
    const { charts: chart4summary, version } = useSelector(selectSummaryCharts);

    const dispatch = useDispatch();
    useEffect(() => {
        if (chart4summary.length > 0 && version === packageJson.version) {
            return;
        }

        const charts = loadData();
        if (charts) {
            dispatch(
                charts4summaryActions.initStore({
                    charts: Object.values(charts),
                    version: packageJson.version,
                })
            );
        }
    });
};
