/**
 * Converts an array of lab values into rows for display.
 *
 * @param labValues - The array of lab values to convert.
 * @returns An object containing the header and rows for display.
 */
export function convertLab2Rows(
    labValues: {
        'Lab test': string;
        'Reference interval': string;
        Unit: string;
        Value: number;
        timestamp: Date;
    }[]
): {
    header: string[];
    rows: (string | number)[][];
} {
    const sortedLabValues = [...labValues].sort(
        (a, b) => Number(a.timestamp) - Number(b.timestamp)
    );
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
                timestamp,
                Unit: unit,
                'Lab test': name,
                'Reference interval': reference,
                ...rest
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
            const dateTimeKey = new Date(timestamp)
                .toISOString()
                .slice(0, 16)
                .replace('T', ' ');

            if (!acc[dateTimeKey]) {
                acc[dateTimeKey] = [];
            }
            acc[dateTimeKey].push({
                name,
                value: rest.Value,
            });

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
        const row: (string | number)[] = [name, unit, reference];
        Object.values(labValuesWide).map((values) => {
            const value = values.find((v) => v.name === name);
            if (value) {
                row.push(value.value);
            } else {
                row.push('');
            }
        });
        return row;
    });
    return { header, rows };
}
