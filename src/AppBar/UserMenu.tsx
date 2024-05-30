import { AccountBox } from '@mui/icons-material';
import {
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import { selectUser, userActions } from 'features';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export function UserMenu() {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const navigator = useNavigate();
    const logout = useCallback(() => {
        dispatch(userActions.logout());
        navigator('/');
    }, [dispatch, navigator]);

    if (user) {
        return (
            <>
                <ListItem>
                    <ListItemIcon>
                        <AccountBox />
                    </ListItemIcon>
                    <ListItemText>User</ListItemText>
                </ListItem>
                <ListItem>
                    {user.firstName} {user.lastName}
                </ListItem>
                <ListItem>
                    <ListItemText>{user.userMainEmail}</ListItemText>
                </ListItem>
                <ListItemButton onClick={logout}>Logout</ListItemButton>
            </>
        );
    }

    return (
        <ListItemButton onClick={() => navigator('/login')}>
            Login
        </ListItemButton>
    );
}
