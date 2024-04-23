import {
    Alert,
    Autocomplete,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Typography,
} from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';

import { usePasteHandler } from './usePasteHandler';

export interface TextCaptureProps {
    charts: Chart[];
    createNewCase: (args: {
        name: string;
        specialty: string;
        notes: Note[];
    }) => void;
}

export const TextCapture: React.FC<TextCaptureProps> = ({
    charts,
    createNewCase,
}) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [name, setName] = useState('');
    const [specialty, setSpecialty] = useState('');
    const [textInput, setTextInput] = useState('');
    useEffect(() => {
        if (!dialogOpen) {
            return;
        }
        if (name !== '') {
            return;
        }
        if (charts.length === 0) {
            setName('Case 1');
            return;
        }

        const lastCase = charts[charts.length - 1];
        // Usually the cases are named Case 1, Case 2, etc.
        // Remove the number and increment it by 1
        const caseNumber = lastCase
            ? parseInt(lastCase.name.replace('Case ', ''), 10) + 1
            : 1;
        setName(`Case ${caseNumber}`);
    }, [charts, dialogOpen, name]);

    const [badHeaders, setBadHeaders] = React.useState<string[]>([]);
    // Assuming usePasteHandler is adjusted to work with raw text input instead of an event
    const handlePaste = usePasteHandler({
        setBadHeaders,
        onDrop: createNewCase,
        name,
        specialty,
    });
    const existingSpecialties = useMemo(() => {
        const specialties = Array.from(
            new Set(charts.map((chart) => chart.specialty))
        );
        specialties.sort((a, b) => a.localeCompare(b));
        return specialties;
    }, [charts]);

    const handleOpenDialog = () => {
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setBadHeaders([]);
    };

    const handleTextChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setTextInput(event.target.value);
    };

    const handleSubmit = () => {
        // Directly call handlePaste with the textInput
        // Adjust usePasteHandler or create a similar function that can process raw text input
        handlePaste(textInput);
        setName('');
        setSpecialty('');
        setTextInput('');
        setDialogOpen(false);
    };

    return (
        <>
            <Button variant="outlined" onClick={handleOpenDialog}>
                Create new case
            </Button>
            <Dialog open={dialogOpen} onClose={handleCloseDialog} fullWidth>
                <DialogTitle>Create your new case</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Autocomplete
                        value={specialty}
                        id="specialty"
                        freeSolo
                        options={existingSpecialties}
                        renderInput={(params) => (
                            <TextField
                                margin="dense"
                                variant="outlined"
                                {...params}
                                label="Specialty"
                            />
                        )}
                        onInputChange={(_event, newInputValue) => {
                            setSpecialty(newInputValue);
                        }}
                    />

                    <TextField
                        margin="dense"
                        id="text"
                        label="Text"
                        type="text"
                        fullWidth
                        multiline
                        variant="outlined"
                        onChange={handleTextChange}
                        placeholder="Paste your text here..."
                        // Overflow should be hidden to prevent the text from being visible
                        sx={{ overflow: 'auto', maxHeight: '800px' }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={!textInput || !specialty || !name}
                    >
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
            {badHeaders.length > 0 && (
                <Alert
                    variant="outlined"
                    color="error"
                    sx={{ marginTop: '8px' }}
                >
                    <strong>Invalid headers:</strong>
                    <br />
                    <Typography variant="body2">
                        The header should be designated with a single hash (#)
                        with type, date, time, author. E.g. # ED admission note,
                        2021-09-01, 10:00, Dr. Smith
                    </Typography>
                    <pre>{badHeaders.join('\n')}</pre>
                </Alert>
            )}
        </>
    );
};
