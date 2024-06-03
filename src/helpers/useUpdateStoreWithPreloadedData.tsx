import { chartsActions, selectCharts, User } from 'features';
import { useEffect, useState } from 'react';
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
    const [hasRun, setHasRun] = useState(false);

    const dispatch = useDispatch();
    useEffect(() => {
        try {
            if (hasRun) {
                return;
            }

            if (!user) {
                console.warn('Cannot load data without a user');
                return;
            }

            const newCharts = loadData();
            setHasRun(true);
            if (!newCharts) {
                console.warn('No original chart data found');
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
    }, [dispatch, existingCharts, hasRun, user, version]);
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
