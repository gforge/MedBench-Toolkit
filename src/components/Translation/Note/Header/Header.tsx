import { Box, Typography } from '@mui/material';
import { useState } from 'react';

import { HeaderDate } from './HeaderDate';
import { TypeEditor, TypeEditorProps } from './TypeEditor';

export const TranslationNoteHeader = ({
    type,
    date,
    time,
    author,
    onTypeChange,
    existingTypes,
}: Header & {
    onTypeChange: TypeEditorProps['onTextChange'];
    existingTypes: string[];
}) => {
    const [isEditing, setIsEditing] = useState(false);
    return (
        <Box
            sx={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                height: '48px',
            }}
            onClick={() => setIsEditing(true)}
        >
            <HeaderDate date={date} time={time} />
            <TypeEditor
                type={type}
                onTextChange={onTypeChange}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                existingTypes={existingTypes}
            />
            <Box sx={{ flex: 1 }} />
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                <Typography color="text.secondary">{author}</Typography>
            </Box>
        </Box>
    );
};
