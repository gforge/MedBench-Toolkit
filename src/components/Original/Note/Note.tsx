import { Button, Card, CardActions, CardContent } from '@mui/material';
import { MarkdownTypography } from 'components';
import type { Note } from 'validators';

import { OriginalNoteHeader } from './Header';

export interface OriginalNoteProps extends Note {
    activated?: boolean;
    activateNote?: () => void;
    id: string;
    hideActions?: boolean;
}

export const OriginalNote = ({
    id,
    type,
    date,
    time,
    author,
    content,
    activated,
    activateNote,
    hideActions,
}: OriginalNoteProps) => (
    <Card
        id={id}
        sx={{
            marginBottom: '10px',
            minWidth: 275,
            opacity: activated ? 1 : 0.8, // Full opacity when activated, faded otherwise
            transition: 'opacity 0.3s ease-in-out', // Smooth transition for opacity change
        }}
        onDoubleClick={activateNote}
    >
        <CardContent>
            <OriginalNoteHeader
                type={type}
                date={date}
                time={time}
                author={author}
            />
            <MarkdownTypography content={content} />
        </CardContent>
        {!hideActions && (
            <CardActions sx={{ justifyContent: 'flex-end' }}>
                <Button
                    size="small"
                    onClick={activateNote}
                    disabled={activated}
                >
                    Translate
                </Button>
            </CardActions>
        )}
    </Card>
);
