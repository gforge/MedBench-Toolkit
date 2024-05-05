import { Collapse, Stack } from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useRef } from 'react';
import { LabValue, MedicationValue } from 'validators';

import { LabTable } from './LabTable';
import { MedicationTable } from './MedicationTable';

type ShowDetailsProp = {
    showLab: boolean;
    showMedication: boolean;
    medications: MedicationValue[];
    labValues: LabValue[];
    currentDay: dayjs.Dayjs;
    first: boolean;
};

export const ShowDetails = ({
    showLab,
    showMedication,
    medications,
    labValues,
    currentDay,
    first,
}: ShowDetailsProp) => {
    const labRef = useRef<HTMLDivElement>(null);
    const medicationRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (showLab && labRef.current) {
                labRef.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                });
            }
            if (showMedication && medicationRef.current) {
                medicationRef.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                });
            }
        }, 500);
        return () => clearTimeout(timer); // Clean up the timer
    }, [showLab, showMedication]);

    return (
        <Stack
            direction="row"
            gap={2}
            alignItems="start"
            useFlexGap
            flexWrap="wrap"
        >
            <Collapse
                in={showLab}
                unmountOnExit
                orientation={showMedication ? 'horizontal' : 'vertical'}
            >
                <LabTable
                    labValues={labValues}
                    currentDay={currentDay}
                    first={first}
                    ref={labRef}
                />
            </Collapse>

            <Collapse
                in={showMedication}
                unmountOnExit
                orientation={showLab ? 'horizontal' : 'vertical'}
                ref={medicationRef}
            >
                <MedicationTable
                    medications={medications}
                    currentDay={currentDay}
                />
            </Collapse>
        </Stack>
    );
};
