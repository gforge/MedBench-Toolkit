import { fullChartSchema } from 'validators';
import { InferType } from 'yup';

// Define the expected structure of your JSON files if known
type FullChartData = {
    case_id: string;
    specialty: string;
    chart: InferType<typeof fullChartSchema>;
}

// Update the resolver type to reflect that it resolves to a module with a `default` property
type LoadedData = Record<string, FullChartData>;

export const loadData = (): LoadedData => {
    const modulePaths = import.meta.glob<{ default: unknown}>('../data/*.json', { eager: true });

    const modules = Object.entries(modulePaths)
        .map(([path, data]): [string, FullChartData] | null => {
            if (typeof path !== 'string') return null;

            const filename = path.split('/').pop();
            if (!filename) return null;

            const moduleName = filename.replace('.json', '');
            try {
                const chart = fullChartSchema.validateSync(data.default);
                return [moduleName, {
                    case_id: moduleName.replace(/.+(Case \d+).+/, "$1"),
                    specialty: moduleName.replace(/raw_([^_]+).+/, "$1"),
                    chart,
                }];                
            } catch (error) {
                console.warn(`Error loading ${moduleName}: ${error}`);
                return null;
            }
        })
        .filter((module): module is [string, FullChartData] => module !== null);

    return Object.fromEntries(modules);
};
