import { Collapse, Stack } from '@mui/material';
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
    first: boolean;
};

export const ShowDetails = ({
    showLab,
    showMedication,
    medications,
    labValues,
    currentDay,
    first,
}: ShowDetailsProp) => (
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
            />
        </Collapse>

        <Collapse
            in={showMedication}
            unmountOnExit
            orientation={showLab ? 'horizontal' : 'vertical'}
        >
            <MedicationTable
                medications={medications}
                currentDay={currentDay}
            />
        </Collapse>
    </Stack>
);
