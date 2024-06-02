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
            try {
                if (!data.default) {
                    throw new Error('No default export');
                }

                const { chart: notes, medications, lab } = data.default;
                const chart = chartValidator.validateSync({
                    notes,
                    medications,
                    lab,
                    name: moduleName.replace(/.+(Case \d+).+/, '$1'),
                    specialty: moduleName.replace(/raw_([^_]+).+/, '$1'),
                    language: moduleName.replace(/.+_([^.]+)/, '$1'),
                });
                return [moduleName, chart];
            } catch (error) {
                console.warn(`Error loading ${moduleName}: ${error}`);
                return null;
            }
        })
        .filter((module): module is [string, Chart] => module !== null);

    return Object.fromEntries(modules);
};
