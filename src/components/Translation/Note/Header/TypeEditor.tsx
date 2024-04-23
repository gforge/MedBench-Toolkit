import { Autocomplete, Box, TextField, Typography } from '@mui/material';
import { useState } from 'react';

export type TypeEditorProps = Pick<Header, 'type'> & {
    isEditing: boolean;
    setIsEditing: (isEditing: boolean) => void;
    onTextChange: (newText: string) => void;
    existingTypes: string[];
};

export const TypeEditor = ({
    type,
    onTextChange,
    isEditing,
    setIsEditing,
    existingTypes,
}: TypeEditorProps) => {
    const [editableText, setEditableText] = useState(type);

    // Escape key cancels editing
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Escape') {
            setIsEditing(false);
        }
    };

    const handleBlur = () => {
        setIsEditing(false);
        onTextChange(editableText);
    };

    if (isEditing) {
        return (
            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'flex-start',
                    height: '100%',
                }}
            >
                <Autocomplete
                    value={editableText}
                    freeSolo
                    options={existingTypes}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Type"
                            onKeyDown={handleKeyDown}
                        />
                    )}
                    onBlur={handleBlur}
                    onInputChange={(_event, newInputValue) => {
                        setEditableText(newInputValue);
                    }}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                            handleBlur();
                        }
                    }}
                    sx={{ width: '100%' }}
                />
            </Box>
        );
    }

    return (
        <Box
            sx={{
                flex: 1,
                overflow: 'hidden',
                // Darken when mouse hovers, animate the change
                '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.05)',
                    transition: 'background-color 0.3s ease-in-out',
                },
            }}
        >
            <Typography variant="subtitle1" component="div">
                {type}
            </Typography>
        </Box>
    );
};
