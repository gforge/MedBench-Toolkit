import type { LabValue } from 'validators';

export type LabValueTableProps = {
  labValues: LabValue[];
};

export const LabValueTable =  ({ labValues}: LabValueTableProps) => {
    // Convert lab values to wide format sorted by timestamp
    // the first row is the name, second the unit, then the reference value,
    // followed by a column for each time stamp, e.g. Reference value | 2021-01-01 11:00 | 2021-01-02 12:00 | ...
    labValues.sort((a, b) => Number(a.timestamp) - Number(b.timestamp));
    const initialColumns: {
        name: string,
        unit: string,
        reference: string,
    }[]
    const labValuesWide = labValues.reduce((acc: Record<string, { name: string, value: string | number }>, labValue) => {
        const { timestamp, Unit: unit, "Lab test": name, "Reference interval": reference,  ...rest } = labValue;
        let index = initialColumns.findIndex((i) => i.name === name);
        if (index < 0) {
            initialColumns.push({
                name,
                unit,
                reference,
            });
            index = initialColumns.length - 1;
        }
        // Convert to YYYY-MM-dd HH:mm
        const dateTimeKey = new Date(timestamp).toISOString().slice(0, 16).replace("T", " ");
        if (acc[])

        return acc;
    }, {})

    return (
        <table>
        <thead>
            <tr>
            <th>Lab test</th>
            <th>Reference interval</th>
            <th>Unit</th>
            <th>Value</th>
            <th>timestamp</th>
            </tr>
        </thead>
        <tbody>
            {labValues.map((labValue) => (
            <tr key={labValue.timestamp.toISOString()}>
                <td>{labValue["Lab test"]}</td>
                <td>{labValue["Reference interval"]}</td>
                <td>{labValue.Unit}</td>
                <td>{labValue.Value}</td>
                <td>{labValue.timestamp.toISOString()}</td>
            </tr>
            ))}
        </tbody>
        </table>
    );
};

