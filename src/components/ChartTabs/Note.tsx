import { OriginalNote } from 'components';
import dayjs from 'dayjs';
import { ChartValue, LabValue, MedicationValue } from 'validators';

import { getNoteId } from '../../helpers';

type ChartNoteProps = {
    medications: MedicationValue[];
    labValues: LabValue[];
    note: ChartValue;
};

export const Note = ({ medications, labValues, note }: ChartNoteProps) => {
    const todaysLabValues = labValues.filter((lab) =>
        dayjs(lab.timestamp).isSame(dayjs(note.date), 'day')
    );
    const todaysMedications = medications.filter((med) =>
        dayjs(med.date).isSame(dayjs(note.date), 'day')
    );
    return (
        <>
            <OriginalNote
                id={getNoteId(note)}
                {...note}
                hideActions
                activated
            />
            <div>Lab {todaysLabValues.length}</div>
            <div>Medications {todaysMedications.length}</div>
        </>
    );
};
