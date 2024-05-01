import type { MedicationValue } from 'validators';

/**
 * Converts an array of medications values into rows for display.
 *
 * @param medications - The array of lab values to convert.
 * @returns An object containing the header and rows for display.
 */
export function convertMeds2Rows(medications: MedicationValue[]): {
    header: string[];
    rows: (string | number)[][];
} {
    const sortedMedications = [...medications].sort(
        (a, b) => Number(a.timestamp) - Number(b.timestamp)
    );
    const initialColumns: {
        name: string;
        strength: string;
        unit: string;
        administration: string;
    }[] = [];
    const medicationsWide = sortedMedications.reduce(
        (
            acc: Record<string, { name: string; value: string | undefined }[]>,
            medication
        ) => {
            const {
                timestamp,
                Medication: name,
                'Way of adminstration': administration,
                Strength: strength,
                Unit: unit,
                Times_per_day: tpd,
            } = medication;
            const index = initialColumns.findIndex((i) => i.name === name);
            if (index < 0) {
                initialColumns.push({
                    name,
                    administration,
                    strength,
                    unit,
                });
            }
            // Convert to YYYY-MM-dd
            const dateTimeKey = new Date(timestamp).toISOString().slice(0, 10);

            if (!acc[dateTimeKey]) {
                acc[dateTimeKey] = [];
            }
            acc[dateTimeKey].push({
                name,
                value: tpd,
            });

            return acc;
        },
        {}
    );
    const header = [
        'Name',
        'Way of administration',
        'Strength',
        'Unit',
        ...Object.keys(medicationsWide),
    ];

    const rows = initialColumns.map((column) => {
        const { name, strength, unit, administration } = column;
        const row: string[] = [name, administration, strength, unit];
        Object.values(medicationsWide).map((values) => {
            const value = values.find((v) => v.name === name);
            row.push(value?.value ?? '');
        });
        return row;
    });
    return { header, rows };
}
