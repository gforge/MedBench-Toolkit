import dayjs from 'dayjs';
import { LabValue } from 'validators';

const today = dayjs();
const buildLabValue = ({
    labTest: lt,
    referenceInterval: ri,
    unit,
    value,
    date,
}: Pick<LabValue, 'labTest' | 'referenceInterval' | 'unit' | 'value'> & {
    date: dayjs.Dayjs;
}): LabValue => ({
    labTest: lt,
    referenceInterval: ri,
    unit,
    value,
    timestamp: date.toDate(),
});

const buildLabValues = ({
    dates,
    values,
    ...lv
}: Pick<LabValue, 'labTest' | 'referenceInterval' | 'unit'> & {
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
            value: valStr,
        });
    });
};

export const exampleLabValues: LabValue[] = [
    ...buildLabValues({
        labTest: 'Hb',
        referenceInterval: '120-140',
        unit: 'mg/dL',
        dates: [today, today.add(2, 'day')],
        values: [130, 111],
    }),
    ...buildLabValues({
        labTest: 'WBC',
        referenceInterval: '4-7',
        unit: 'mmol/L',
        values: [5, 15, 4],
        dates: [today.add(1, 'day'), today.add(3, 'day'), today.add(4, 'day')],
    }),
    ...buildLabValues({
        labTest: 'CRP',
        referenceInterval: '<3',
        unit: 'mmol/L',
        values: [1, 30],
        dates: [today.add(1, 'day'), today.add(3, 'day')],
    }),
];
