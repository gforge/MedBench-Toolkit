import { chartsActions, selectCharts, User } from 'features';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from 'store';
import { Chart } from 'validators';

import packageJson from '../../package.json'; // Adjust the path accordingly
import { getChartId } from './getChartId';
import { loadData } from './loadData';

export const useUpdateStoreWithPreloadedData = () => {
    const existingCharts = useSelector(selectCharts);
    const version = useSelector((state: RootState) => state.charts.version);
    const user = useSelector((state: RootState) => state.user.user);

    const dispatch = useDispatch();
    useEffect(() => {
        try {
            const newCharts = loadData();
            if (!newCharts) {
                console.warn('No original chart data found');
                return;
            }

            if (!user) {
                console.warn('No user found');
                return;
            }

            updateCharts({
                dispatch,
                newCharts: Object.values(newCharts),
                existingCharts,
                version,
                user,
            });
        } catch (error) {
            console.error('Error updating store with preloaded data:', error);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};

const updateCharts = ({
    dispatch,
    newCharts,
    existingCharts,
    user,
    version,
}: {
    dispatch: ReturnType<typeof useDispatch>;
    newCharts: Chart[];
    existingCharts: Chart[];
    version: string;
    user: User;
}) => {
    // Reset the store if the version has changed
    if (version !== packageJson.version) {
        dispatch(
            chartsActions.initStore({
                createdBy: user.userMainEmail,
                charts: newCharts,
                version: packageJson.version,
            })
        );
        return;
    }

    // Update the store with new charts if any have been added without changing the version
    const noneExistingCharts = newCharts.filter(
        (chart) =>
            !existingCharts.some(
                (existing) => getChartId(existing) === getChartId(chart)
            )
    );

    if (noneExistingCharts.length === 0) {
        return;
    }

    dispatch(
        chartsActions.addCharts({
            createdBy: user.userMainEmail,
            charts: noneExistingCharts,
        })
    );
};
