import dayjs from 'dayjs';
import { useMemo } from 'react';
import { LabValue, MedicationValue } from 'validators';

export const useTodaysLabValues = (
    labValues: LabValue[],
    currentDay: dayjs.Dayjs
): {
    current: LabValue;
    previous: LabValue | undefined;
}[] =>
    useMemo(() => {
        const todays = labValues.filter((lab) =>
            dayjs(lab.timestamp).isSame(currentDay, 'day')
        );

        // Return the current lab value and the previous lab value for the same lab test
        // If there is no previous lab value, return undefined
        return todays.map((lab) => {
            const sameTest = labValues.filter((l) => l.labTest === lab.labTest);
            return {
                current: lab,
                previous: sameTest
                    .filter((l) => dayjs(l.timestamp).isBefore(currentDay))
                    .sort((a, b) =>
                        dayjs(b.timestamp).diff(dayjs(a.timestamp))
                    )[0],
            };
        });
    }, [labValues, currentDay]);

export const useTodaysMedications = (
    medications: MedicationValue[],
    currentDay: dayjs.Dayjs
): { current: MedicationValue; previous: MedicationValue | undefined }[] =>
    useMemo(() => {
        const todaysMedications = medications.filter((med) =>
            dayjs(med.timestamp).isSame(currentDay, 'day')
        );

        return todaysMedications.map((current) => {
            const previousMedications = medications
                .filter(
                    (med) =>
                        med.medication === current.medication &&
                        dayjs(med.timestamp).isBefore(currentDay)
                )
                .sort((a, b) => dayjs(b.timestamp).diff(dayjs(a.timestamp))); // Sort descending by date

            return {
                current,
                previous:
                    previousMedications.length > 0
                        ? previousMedications[0]
                        : undefined,
            };
        });
    }, [medications, currentDay]);
