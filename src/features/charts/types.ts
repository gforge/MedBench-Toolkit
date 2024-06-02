import type { Chart } from 'validators';

export interface ChartsState {
    charts: (Chart & { createdBy: string })[];
    version: string; // The package version
}
