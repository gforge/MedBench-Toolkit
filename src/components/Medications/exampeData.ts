import dayjs from 'dayjs';
import { MedicationValue } from 'validators';

const today = dayjs();
const buildMedication = ({
    Medication,
    'Way of adminstration': woa,
    Unit,
    Strength,
    'Times per day': tpd,
    timestamp,
}: Pick<
    MedicationValue,
    | 'Medication'
    | 'Strength'
    | 'Way of adminstration'
    | 'Unit'
    | 'Times per day'
> & { timestamp: dayjs.Dayjs }): MedicationValue => ({
    Medication,
    'Way of adminstration': woa,
    Unit,
    Strength,
    'Times per day': tpd,
    parsed_date: today.toDate().toISOString().substring(0, 10),
    Date: timestamp.toDate().toISOString().substring(0, 10),
    timestamp: timestamp.toDate(),
});

const buildMedications = ({
    repeats,
    start,
    ...mv
}: Pick<
    MedicationValue,
    | 'Medication'
    | 'Strength'
    | 'Way of adminstration'
    | 'Unit'
    | 'Times per day'
> & { start: dayjs.Dayjs; repeats: number }): MedicationValue[] =>
    Array.from({ length: repeats }, (_, i) =>
        buildMedication({ ...mv, timestamp: start.add(i, 'day') })
    );

export const exampleMedications: MedicationValue[] = [
    ...buildMedications({
        Medication: 'Paracetamol',
        'Way of adminstration': 'Oral',
        Unit: 'g',
        Strength: '1',
        'Times per day': '1+1+1',
        start: today,
        repeats: 4,
    }),
    ...buildMedications({
        Medication: 'Heracillin',
        'Way of adminstration': 'Oral',
        Unit: 'mg',
        Strength: '500',
        'Times per day': '2+2+2',
        start: today.add(2, 'day'),
        repeats: 2,
    }),
];
