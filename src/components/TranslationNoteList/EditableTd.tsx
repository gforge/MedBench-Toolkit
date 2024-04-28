import { TextField } from '@mui/material';
import { useState } from 'react';

import { StyledTd as Td } from './StyledTd';

interface EditableTdProps {
    text: string;
    setText: (text: string) => void;
}

export const EditableTd = ({ text, setText }: EditableTdProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newText, setNewText] = useState(text);
    const cellSeparator = '1px solid #ddd';
    if (isEditing) {
        return (
            <Td style={{ borderRight: cellSeparator }}>
                <TextField
                    type="text"
                    size="small"
                    value={newText}
                    onChange={(e) => {
                        setNewText(e.target.value);
                    }}
                    onBlur={() => {
                        setText(newText);
                        setIsEditing(false);
                    }}
                />
            </Td>
        );
    }

    return (
        <Td
            style={{ borderRight: cellSeparator }}
            onDoubleClick={() => setIsEditing(true)}
        >
            {text}
        </Td>
    );
};
