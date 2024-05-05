import { Medication, Science } from '@mui/icons-material';
import { Box, Button, ButtonGroup, Paper, Tooltip } from '@mui/material';
import { MarkdownTypography, OriginalNoteHeader } from 'components';
import dayjs from 'dayjs';
import { useState } from 'react';
import { LabValue, MedicationValue } from 'validators';

import { ShowDetails } from './ShowDetails';

type ChartNoteProps = {
    medications: MedicationValue[];
    labValues: LabValue[];
    note: Note;
    first: boolean;
};

const useHasMedication = ({
    medications,
    currentDay,
}: {
    medications: MedicationValue[];
    currentDay: dayjs.Dayjs;
}): boolean => {
    return !!medications.some(({ date }) =>
        dayjs.utc(date).isSame(currentDay, 'day')
    );
};

const useHasLabValue = ({
    labValues,
    currentDay,
    first,
}: {
    labValues: LabValue[];
    currentDay: dayjs.Dayjs;
    first: boolean;
}): boolean => {
    return !!labValues.some(({ date, time }) =>
        first
            ? dayjs.utc(`${date} ${time}`).isBefore(currentDay, 'day') ||
              dayjs.utc(`${date} ${time}`).isSame(currentDay, 'day')
            : dayjs.utc(`${date} ${time}`).isSame(currentDay, 'day')
    );
};

export const Note = ({
    medications,
    labValues,
    note: { header, content },
    first,
}: ChartNoteProps) => {
    const currentDay = dayjs.utc(header.date);
    const hasMeds = useHasMedication({ medications, currentDay });
    const hasLab = useHasLabValue({ labValues, currentDay, first });
    const [showMedication, setShowMedication] = useState(false);
    const [showLab, setShowLab] = useState(false);

    return (
        <Paper sx={{ marginBottom: '10px', padding: '1rem' }}>
            <Box sx={{ maxWidth: '600px', margin: 'auto' }}>
                <OriginalNoteHeader {...header} />
                <MarkdownTypography content={content} />
            </Box>
            <ButtonGroup sx={{ margin: 'auto', marginTop: '10px' }}>
                <Tooltip title="Show todays lab values">
                    <span>
                        <Button
                            variant={showLab ? 'contained' : 'outlined'}
                            startIcon={<Science />}
                            disabled={!hasLab}
                            onClick={() => setShowLab(!showLab)}
                            size="small"
                        >
                            Lab
                        </Button>
                    </span>
                </Tooltip>
                <Tooltip title="Show todays medications">
                    <span>
                        <Button
                            variant={showMedication ? 'contained' : 'outlined'}
                            startIcon={<Medication />}
                            disabled={!hasMeds}
                            onClick={() => setShowMedication(!showMedication)}
                            size="small"
                        >
                            Medication
                        </Button>
                    </span>
                </Tooltip>
            </ButtonGroup>
            <ShowDetails
                showLab={showLab}
                showMedication={showMedication}
                medications={medications}
                labValues={labValues}
                currentDay={currentDay}
                first={first}
            />
        </Paper>
    );
};
