import dayjs from 'dayjs';
import { MedicationValue } from 'validators';

const today = dayjs();
const buildMedication = ({
    medication,
    wayOfAdministration: woa,
    unit,
    strength,
    timesPerDay: tpd,
    timestamp,
}: Pick<
    MedicationValue,
    'medication' | 'strength' | 'wayOfAdministration' | 'unit' | 'timesPerDay'
> & { timestamp: dayjs.Dayjs }): MedicationValue => ({
    medication,
    wayOfAdministration: woa,
    unit,
    strength,
    timesPerDay: tpd,
    date: timestamp.toDate().toISOString().substring(0, 10),
});

const buildMedications = ({
    repeats,
    start,
    ...mv
}: Pick<
    MedicationValue,
    'medication' | 'strength' | 'wayOfAdministration' | 'unit' | 'timesPerDay'
> & { start: dayjs.Dayjs; repeats: number }): MedicationValue[] =>
    Array.from({ length: repeats }, (_, i) =>
        buildMedication({ ...mv, timestamp: start.add(i, 'day') })
    );

export const exampleMedications: MedicationValue[] = [
    ...buildMedications({
        medication: 'Paracetamol',
        wayOfAdministration: 'Oral',
        unit: 'g',
        strength: '1',
        timesPerDay: '1+1+1',
        start: today,
        repeats: 4,
    }),
    ...buildMedications({
        medication: 'Heracillin',
        wayOfAdministration: 'Oral',
        unit: 'mg',
        strength: '500',
        timesPerDay: '2+2+2',
        start: today.add(2, 'day'),
        repeats: 2,
    }),
];
