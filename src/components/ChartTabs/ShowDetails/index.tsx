import { Stack } from '@mui/material';
import dayjs from 'dayjs';
import { LabValue, MedicationValue } from 'validators';

import { LabTable } from './LabTable';
import { MedicationTable } from './MedicationTable';

type ShowDetailsProp = {
    showLab: boolean;
    showMedication: boolean;
    medications: MedicationValue[];
    labValues: LabValue[];
    currentDay: dayjs.Dayjs;
};

export const ShowDetails = ({
    showLab,
    showMedication,
    medications,
    labValues,
    currentDay,
}: ShowDetailsProp) => {
    if (!showLab && !showMedication) {
        return null;
    }

    return (
        <Stack
            direction="row"
            gap={2}
            alignItems="start"
            useFlexGap
            flexWrap="wrap"
        >
            {showLab && (
                <LabTable labValues={labValues} currentDay={currentDay} />
            )}
            {showMedication && (
                <MedicationTable
                    medications={medications}
                    currentDay={currentDay}
                />
            )}
        </Stack>
    );
};
