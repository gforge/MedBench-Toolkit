import { Box, Paper, Stack } from '@mui/material';
import { useScrollToActiveNote } from 'components';
import { getNoteId } from 'helpers';
import React, { useMemo } from 'react';

import { AddNote } from './AddNote';
import { filterNote } from './filterNote';
import { TranslationNote } from './Note';
import { TranslationChartProps } from './types';

export const TranslationChart = ({
    notes,
    activatedNoteId,
    activateNote,
    updateNote,
    insertNote,
    deleteNote,
}: TranslationChartProps) => {
    const prefix = 'translation_';
    useScrollToActiveNote({ activatedNoteId, prefix });
    const existingTypes = useMemo(() => {
        const types = notes.map(({ header }) => header.type);
        const uniqueTypes = new Set(types);
        return Array.from(uniqueTypes);
    }, [notes]);

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
                    {notes.map((note, index) => {
                        const noteId = getNoteId(note);

                        return (
                            <React.Fragment key={noteId}>
                                {index === 0 && (
                                    <AddNote
                                        insertNote={insertNote}
                                        noteId={noteId}
                                        title="Inser a note before the first one"
                                        position="before"
                                    />
                                )}
                                <TranslationNote
                                    id={prefix + noteId}
                                    activated={activatedNoteId === noteId}
                                    existingTypes={existingTypes}
                                    {...note}
                                    activateNote={() => activateNote(noteId)}
                                    deactivateNote={() => activateNote('')}
                                    onUpdate={filterNote({
                                        updateNote,
                                        noteId,
                                    })}
                                    deleteNote={() => deleteNote(noteId)}
                                />
                                <AddNote
                                    insertNote={insertNote}
                                    noteId={noteId}
                                    title="Insert a note"
                                    position="after"
                                />
                            </React.Fragment>
                        );
                    })}
                </Stack>
            </Box>
        </Paper>
    );
};
