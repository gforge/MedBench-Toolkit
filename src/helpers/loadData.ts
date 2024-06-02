import { Chart, chartValidator } from 'validators';

type LoadedData = Record<string, Chart>;

export const loadData = (): LoadedData => {
    const modulePaths = import.meta.glob<{
        default: { chart: object; medications: object; lab: object };
    }>('../data/*.json', { eager: true });

    const modules = Object.entries(modulePaths)
        .map(([path, data]): [string, Chart] | null => {
            if (typeof path !== 'string') return null;

            const filename = path.split('/').pop();
            if (!filename) return null;

            const moduleName = filename.replace('.json', '');
            const name = moduleName.replace(/.+(Case \d+).+/, '$1');
            const specialty = moduleName.replace(/raw_([^_]+).+/, '$1');
            const language = moduleName.replace(/.+_([^.]+)/, '$1');

            try {
                if (!data.default) {
                    throw new Error('No default export');
                }

                const { chart: notes, medications, lab } = data.default;
                const rawChart = {
                    notes,
                    medications,
                    lab,
                    name,
                    specialty,
                    language,
                };
                const chart = chartValidator.validateSync(rawChart);
                return [moduleName, chart];
            } catch (error) {
                console.warn(`Error loading ${moduleName}: ${error}`);
                return null;
            }
        })
        .filter((module): module is [string, Chart] => module !== null);

    return Object.fromEntries(modules);
};
