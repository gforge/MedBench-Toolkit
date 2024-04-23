import {
    Button,
    ButtonGroup,
    Card,
    CardActions,
    CardContent,
    TextareaAutosize,
} from '@mui/material';
import { MarkdownTypography } from 'components';

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
    header,
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
                {...header}
                onTypeChange={(type: string) =>
                    onUpdate({ content: undefined, type })
                }
                existingTypes={existingTypes}
            />
            {activated ? (
                <TextareaAutosize
                    aria-label="minimum height"
                    minRows={3}
                    placeholder="The content of the note"
                    value={content}
                    onChange={(e) =>
                        onUpdate({ content: e.target.value, type: undefined })
                    }
                    style={{
                        width: '100%',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        padding: '4px',
                    }}
                />
            ) : (
                <MarkdownTypography content={content} />
            )}
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
