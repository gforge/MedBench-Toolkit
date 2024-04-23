import { Add } from '@mui/icons-material';
import {
    Button,
    Dialog,
    IconButton,
    Stack,
    TextField,
    Tooltip,
} from '@mui/material';
import { FormEvent, useState } from 'react';

import { InsertNoteFn } from './types';

export const AddNote = ({
    insertNote,
    noteId,
    title,
    position,
}: {
    insertNote: InsertNoteFn;
    title: string;
    noteId: string;
    position: 'before' | 'after';
}) => {
    const [open, setOpen] = useState(false);

    const [type, setType] = useState('');
    const [author, setAuthor] = useState('');

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        insertNote({
            noteId,
            position,
            type,
            author,
        });
        setOpen(false);
    };
    return (
        <Stack
            spacing={1}
            direction="row"
            justifyContent={'end'}
            sx={{ margin: '0px' }}
        >
            <Tooltip title={title}>
                <IconButton onClick={() => setOpen(true)} color="success">
                    <Add />
                </IconButton>
            </Tooltip>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={2} padding={2}>
                        <TextField
                            label="Type of note"
                            placeholder="E.g. progress"
                            value={type}
                            onChange={(e) => setType(e.target.value)} // Update type state on change
                            margin="dense"
                        />
                        <TextField
                            label="Author of note"
                            placeholder="Dr/Nurse"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)} // Update author state on change
                            margin="dense"
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="success"
                            disabled={!type || !author}
                        >
                            Create
                        </Button>
                    </Stack>
                </form>
            </Dialog>
        </Stack>
    );
};
