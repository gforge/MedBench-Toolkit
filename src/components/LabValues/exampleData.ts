import dayjs from 'dayjs';
import { LabValue } from 'validators';

const today = dayjs();
const buildLabValue = ({
    'Lab test': lt,
    'Reference interval': ri,
    Unit,
    Value,
    date,
}: Pick<LabValue, 'Lab test' | 'Reference interval' | 'Unit' | 'Value'> & {
    date: dayjs.Dayjs;
}): LabValue => ({
    'Lab test': lt,
    'Reference interval': ri,
    Unit,
    Value,
    timestamp: date.toDate(),
});

const buildLabValues = ({
    dates,
    values,
    ...lv
}: Pick<LabValue, 'Lab test' | 'Reference interval' | 'Unit'> & {
    dates: dayjs.Dayjs[];
    values: (number | string)[];
}): LabValue[] => {
    if (dates.length !== values.length) {
        throw new Error('Dates and values must have the same length');
    }

    return dates.map((d, i) => {
        const val = values[i];
        const valStr = typeof val === 'number' ? val.toString() : val;
        return buildLabValue({
            ...lv,
            date: d,
            Value: valStr,
        });
    });
};

export const exampleLabValues: LabValue[] = [
    ...buildLabValues({
        'Lab test': 'Hb',
        'Reference interval': '120-140',
        Unit: 'mg/dL',
        dates: [today, today.add(2, 'day')],
        values: [130, 111],
    }),
    ...buildLabValues({
        'Lab test': 'WBC',
        'Reference interval': '4-7',
        Unit: 'mmol/L',
        values: [5, 15, 4],
        dates: [today.add(1, 'day'), today.add(3, 'day'), today.add(4, 'day')],
    }),
    ...buildLabValues({
        'Lab test': 'CRP',
        'Reference interval': '<3',
        Unit: 'mmol/L',
        values: [1, 30],
        dates: [today.add(1, 'day'), today.add(3, 'day')],
    }),
];
