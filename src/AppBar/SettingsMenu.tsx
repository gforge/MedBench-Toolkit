import { Settings } from '@mui/icons-material';
import {
    FormControl,
    InputLabel,
    ListItem,
    ListItemIcon,
    ListItemText,
    MenuItem,
    Select,
    SelectChangeEvent,
} from '@mui/material';
import { selectSettings, settingsActions } from 'features';
import { useDispatch, useSelector } from 'react-redux';

const refineValue = (value: string) => {
    if (value === 'basic') {
        return 'basic';
    }
    if (value === 'react-md-editor') {
        return 'react-md-editor';
    }
    return 'basic';
};

export function SettingsMenu() {
    const { texteditor: typeOfEditor } = useSelector(selectSettings);
    const dispatch = useDispatch();
    const handleChange = (
        event: SelectChangeEvent<'react-md-editor' | 'basic'>
    ) => {
        const refinedValue = refineValue(event.target.value);
        dispatch(settingsActions.setTextEditor(refinedValue));
    };

    return (
        <>
            <ListItem>
                <ListItemIcon>
                    <Settings />
                </ListItemIcon>
                <ListItemText>
                    <strong>Settings</strong>
                </ListItemText>
            </ListItem>
            <ListItem>
                <FormControl fullWidth>
                    <InputLabel id="editor-type-setting-label">
                        Type of editor
                    </InputLabel>
                    <Select
                        labelId="editor-type-setting-label"
                        id="editor-type-setting"
                        value={typeOfEditor}
                        label="Type of editor"
                        onChange={handleChange}
                    >
                        <MenuItem value={'basic'}>Basic</MenuItem>
                        <MenuItem value={'react-md-editor'}>Markdown</MenuItem>
                    </Select>
                </FormControl>
            </ListItem>
        </>
    );
}
