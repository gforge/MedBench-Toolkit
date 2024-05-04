import { LabValue, labValueTimeSort } from 'validators';

/**
 * Converts an array of lab values into rows for display.
 *
 * @param labValues - The array of lab values to convert.
 * @returns An object containing the header and rows for display.
 */
export function convertLab2Rows(
    labValues: Pick<
        LabValue,
        'labTest' | 'unit' | 'referenceInterval' | 'date' | 'time' | 'value'
    >[]
): {
    header: string[];
    rows: string[][];
} {
    const sortedLabValues = [...labValues].sort(labValueTimeSort);
    const initialColumns: {
        name: string;
        unit: string;
        reference: string;
    }[] = [];
    const labValuesWide = sortedLabValues.reduce(
        (
            acc: Record<string, { name: string; value: string | number }[]>,
            labValue
        ) => {
            const {
                date,
                time,
                unit,
                labTest: name,
                referenceInterval: reference,
                value,
            } = labValue;
            const index = initialColumns.findIndex((i) => i.name === name);
            if (index < 0) {
                initialColumns.push({
                    name,
                    unit,
                    reference,
                });
            }
            // Convert to YYYY-MM-dd HH:mm
            const dateTimeKey = `${date} ${time}`;

            if (!acc[dateTimeKey]) {
                acc[dateTimeKey] = [];
            }
            acc[dateTimeKey].push({ name, value });

            return acc;
        },
        {}
    );
    const header = [
        'Lab test',
        'Unit',
        'Reference interval',
        ...Object.keys(labValuesWide),
    ];

    const rows = initialColumns.map((column) => {
        const { name, unit, reference } = column;
        const row: string[] = [name, unit, reference];
        Object.values(labValuesWide).map((values) => {
            const value = values.find((v) => v.name === name);
            if (value) {
                if (typeof value.value === 'number') {
                    row.push(value.value.toString());
                } else {
                    row.push(value.value);
                }
            } else {
                row.push('');
            }
        });
        return row;
    });
    return { header, rows };
}
