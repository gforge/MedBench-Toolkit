import { Menu as MenuIcon } from '@mui/icons-material';
import {
    Box,
    FormControl,
    IconButton,
    InputLabel,
    Menu,
    MenuItem,
    Select,
    SelectChangeEvent,
} from '@mui/material';
import {
    selectSettings,
    selectUser,
    settingsActions,
    userActions,
} from 'features';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const refineValue = (value: string) => {
    if (value === 'basic') {
        return 'basic';
    }
    if (value === 'react-md-editor') {
        return 'react-md-editor';
    }
    return 'basic';
};

export function AppBarMenu() {
    const { texteditor: typeOfEditor } = useSelector(selectSettings);
    const dispatch = useDispatch();
    const handleChange = (
        event: SelectChangeEvent<'react-md-editor' | 'basic'>
    ) => {
        const refinedValue = refineValue(event.target.value);
        dispatch(settingsActions.setTextEditor(refinedValue));
    };

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const user = useSelector(selectUser);
    const navigator = useNavigate();
    const logout = useCallback(() => {
        dispatch(userActions.logout());
        navigator('/');
    }, [dispatch, navigator]);

    return (
        <>
            <Box sx={{ flexGrow: 0 }}>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{
                        mr: 2,
                        transform: open ? 'rotate(90deg)' : 'none',
                        transition: 'transform 0.3s',
                    }}
                    onClick={handleClick}
                >
                    <MenuIcon />
                </IconButton>
            </Box>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                sx={{ padding: '300px' }}
            >
                <MenuItem>Choose your settings</MenuItem>
                <MenuItem onClick={handleClose}>
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
                            <MenuItem value={'react-md-editor'}>
                                Markdown
                            </MenuItem>
                        </Select>
                    </FormControl>
                </MenuItem>
                {user && <MenuItem onClick={logout}>Logout</MenuItem>}
                {!user && (
                    <MenuItem onClick={() => navigator('/login')}>
                        Login
                    </MenuItem>
                )}
            </Menu>
        </>
    );
}
