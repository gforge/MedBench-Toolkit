import {
    Button,
    ButtonGroup,
    Card,
    CardActions,
    CardContent,
} from '@mui/material';
import type { Note } from 'validators';

import { NoteEditor } from './Editor';
import { TranslationNoteHeader } from './Header';

export interface TranslationNoteProps extends Note {
    id: string;
    activated: boolean;
    existingTypes: string[];
    activateNote?: () => void;
    deactivateNote?: () => void;
    onUpdate: (args: {
        content: string | undefined;
        type: string | undefined;
    }) => void;
    deleteNote: () => void;
}

export const TranslationNote = ({
    id,
    type,
    date,
    time,
    author,
    content,
    existingTypes,
    activated,
    activateNote,
    deactivateNote,
    onUpdate,
    deleteNote,
}: TranslationNoteProps) => (
    <Card
        id={id}
        sx={{
            minWidth: 275,
            opacity: activated ? 1 : 0.6, // Full opacity when activated, faded otherwise
            transition: 'opacity 0.3s ease-in-out', // Smooth transition for opacity change
        }}
        onDoubleClick={activateNote}
    >
        <CardContent>
            <TranslationNoteHeader
                type={type}
                date={date}
                time={time}
                author={author}
                onTypeChange={(type: string) =>
                    onUpdate({ content: undefined, type })
                }
                existingTypes={existingTypes}
            />
            <NoteEditor
                content={content}
                activated={activated}
                onUpdate={onUpdate}
            />
        </CardContent>
        <CardActions sx={{ justifyContent: 'flex-end' }}>
            <ButtonGroup>
                {activated && (
                    <Button size="small" onClick={deactivateNote}>
                        Exit
                    </Button>
                )}
                {!activated && (
                    <Button size="small" onClick={deleteNote} color="error">
                        Delete
                    </Button>
                )}
            </ButtonGroup>
        </CardActions>
    </Card>
);
