import { Medication, Science } from '@mui/icons-material';
import { Button, ButtonGroup, Paper, Tooltip } from '@mui/material';
import { MarkdownTypography, OriginalNoteHeader } from 'components';
import dayjs from 'dayjs';
import { useState } from 'react';
import { LabValue, MedicationValue } from 'validators';

import { ShowDetails } from './ShowDetails';

type ChartNoteProps = {
    medications: MedicationValue[];
    labValues: LabValue[];
    note: Note;
};

const useHasMedication = (
    medications: MedicationValue[],
    currentDay: dayjs.Dayjs
): boolean => {
    return !!medications.some((med) =>
        dayjs(med.timestamp).isSame(currentDay, 'day')
    );
};

const useHasLabValue = (
    labValues: LabValue[],
    currentDay: dayjs.Dayjs
): boolean => {
    return !!labValues.some((lab) =>
        dayjs(lab.timestamp).isSame(currentDay, 'day')
    );
};

export const Note = ({
    medications,
    labValues,
    note: { header, content },
}: ChartNoteProps) => {
    const currentDay = dayjs(header.date);
    const hasMeds = useHasMedication(medications, currentDay);
    const hasLab = useHasLabValue(labValues, currentDay);
    const [showMedication, setShowMedication] = useState(false);
    const [showLab, setShowLab] = useState(false);

    return (
        <Paper sx={{ marginBottom: '10px', padding: '1rem' }}>
            <OriginalNoteHeader {...header} />
            <MarkdownTypography content={content} />
            <ButtonGroup sx={{ marginTop: '10px' }}>
                <Tooltip title="Show todays lab values">
                    <span>
                        <Button
                            variant={showLab ? 'contained' : 'outlined'}
                            startIcon={<Science />}
                            disabled={hasLab}
                            onClick={() => setShowLab(!showLab)}
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
            />
        </Paper>
    );
};
