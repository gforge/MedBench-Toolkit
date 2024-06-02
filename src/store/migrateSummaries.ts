import type { Summary } from '../features';
import type { RootState } from '.';

/**
 * Migrates stored data to the RootState['charts'] format.
 *
 * @param storedData - The stored data to be migrated.
 * @returns The migrated data in the RootState['charts'] format.
 */
export function migrateSummaries(
    storedData: RootState['summaries']
): RootState['summaries'] {
    const oldSummaries = JSON.parse(
        window.localStorage.getItem('summaries2migrate') ?? ''
    ) as Summary[] | null;

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

    window.localStorage.removeItem('summaries2migrate');

    return storedData;
}
