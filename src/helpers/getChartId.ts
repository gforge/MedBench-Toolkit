import { Chart } from 'validators';

export const getChartId = ({
    specialty,
    name,
    language,
}: Pick<Chart, 'specialty' | 'name' | 'language'>): string => {
    return `${specialty}@${name}@${language}`.replaceAll(' ', '_');
};
