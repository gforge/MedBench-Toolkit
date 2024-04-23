import { Box, Paper, Stack } from '@mui/material';
import { useScrollToActiveNote } from 'components';
import { getNoteId } from 'helpers';

import { OriginalNote, OriginalNoteProps } from './Note';

export interface OriginalChartProps {
    notes: Omit<OriginalNoteProps, 'activated' | 'id'>[];
    activatedNoteId?: string;
    activateNote: (noteId: string) => void;
}

export const OriginalChart = ({
    notes,
    activatedNoteId,
    activateNote,
}: OriginalChartProps) => {
    const prefix = 'original_';
    useScrollToActiveNote({ activatedNoteId, prefix });
    return (
        <Paper elevation={1} style={{ padding: '1em' }}>
            <Box
                style={{
                    maxHeight: '90vh',
                    overflowY: 'auto',
                    margin: '0.5em',
                    padding: '0.5em',
                    boxSizing: 'border-box',
                }}
            >
                <Stack spacing={2} direction="column">
                    {notes.map((note) => {
                        const noteId = getNoteId(note);

                        return (
                            <OriginalNote
                                key={noteId}
                                id={prefix + noteId}
                                activated={activatedNoteId === noteId}
                                {...note}
                                activateNote={() => activateNote(noteId)}
                            />
                        );
                    })}
                </Stack>
            </Box>
        </Paper>
    );
};
