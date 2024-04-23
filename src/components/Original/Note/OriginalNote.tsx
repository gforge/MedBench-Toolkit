import {
    Button,
    Card,
    CardActions,
    CardContent,
    Typography,
    TypographyProps,
} from '@mui/material';

import { OriginalNoteHeader } from './Header';
import { OriginalNoteProps } from './Note';

export const OriginalNote = ({
    id,
    header,
    content,
    activated,
    activateNote,
}: OriginalNoteProps) => (
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
            <OriginalNoteHeader {...header} />
            {content.split('\n\n').map((line, index) => {
                let variant: TypographyProps['variant'] = 'body2';
                let marginLeft = '0px';
                if (line.startsWith('## ')) {
                    variant = 'h6';
                    marginLeft = '8px';
                } else if (line.startsWith('### ')) {
                    variant = 'subtitle1';
                    marginLeft = '16px';
                } else if (line.startsWith('#### ')) {
                    variant = 'subtitle2';
                    marginLeft = '24px';
                }

                return (
                    <Typography
                        variant={variant}
                        key={index}
                        sx={{ marginLeft }}
                    >
                        {line}
                    </Typography>
                );
            })}
        </CardContent>
        <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Button size="small" onClick={activateNote} disabled={activated}>
                Translate
            </Button>
        </CardActions>
    </Card>
);
