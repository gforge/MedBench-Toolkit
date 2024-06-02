import type { Summary } from '../features';
import type { RootState } from '.';
import {
    getLocalItemFromRemember,
    removeItemFromRemember,
} from './getLocalItemFromRemember';

/**
 * Migrates stored data to the RootState['charts'] format.
 *
 * @param storedData - The stored data to be migrated.
 * @returns The migrated data in the RootState['charts'] format.
 */
export function migrateSummaries(
    storedData: RootState['summaries']
): RootState['summaries'] {
    const oldSummaries =
        getLocalItemFromRemember<Summary[]>('summaries2migrate');

    if (!oldSummaries) {
        return storedData;
    }

    const nonExistantSummaries = oldSummaries.filter(
        (old) =>
            !storedData.summaries.some(
                (c) =>
                    c.chartId === old.summaryId && c.summaryId === old.summaryId
            )
    );

    storedData.summaries = [...storedData.summaries, ...nonExistantSummaries];

    removeItemFromRemember('summaries2migrate');
    return storedData;
}
