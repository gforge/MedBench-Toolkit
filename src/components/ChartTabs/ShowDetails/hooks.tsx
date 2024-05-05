import dayjs from 'dayjs';
import { useMemo } from 'react';
import { LabValue, MedicationValue } from 'validators';

export const useTodaysLabValues = ({
    labValues,
    currentDay,
    first,
}: {
    labValues: LabValue[];
    currentDay: dayjs.Dayjs;
    first: boolean;
}): {
    current: LabValue;
    previous: LabValue | undefined;
}[] =>
    useMemo(() => {
        const todays = labValues.filter(({ date }) =>
            first
                ? dayjs.utc(date).isSame(currentDay, 'day') ||
                  dayjs.utc(date).isBefore(currentDay, 'day')
                : dayjs.utc(date).isSame(currentDay, 'day')
        );

        // Return the current lab value and the previous lab value for the same lab test
        // If there is no previous lab value, return undefined
        return todays.map((lab) => {
            const sameTest = labValues.filter(
                (l) =>
                    l.labTest === lab.labTest &&
                    `${l.date} ${l.time}` !== `${lab.date} ${lab.time}`
            );
            return {
                current: lab,
                previous: sameTest
                    .filter(({ date, time }) =>
                        dayjs.utc(`${date} ${time}`).isBefore(currentDay)
                    )
                    .sort((a, b) =>
                        dayjs
                            .utc(`${a.date} ${a.time}`)
                            .diff(dayjs.utc(`${b.date} ${b.time}`))
                    )[0],
            };
        });
    }, [labValues, first, currentDay]);

export const useTodaysMedications = (
    medications: MedicationValue[],
    currentDay: dayjs.Dayjs
): { current: MedicationValue; previous: MedicationValue | undefined }[] =>
    useMemo(() => {
        const todaysMedications = medications.filter((med) =>
            dayjs(med.date).isSame(currentDay, 'day')
        );

        return todaysMedications.map((current) => {
            const previousMedications = medications
                .filter(
                    (med) =>
                        med.medication === current.medication &&
                        dayjs(med.date).isBefore(currentDay)
                )
                .sort((a, b) => dayjs(b.date).diff(dayjs(a.date))); // Sort descending by date

            return {
                current,
                previous:
                    previousMedications.length > 0
                        ? previousMedications[0]
                        : undefined,
            };
        });
    }, [medications, currentDay]);
