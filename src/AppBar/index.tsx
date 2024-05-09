import {
    AppBar as MuiAppBar,
    Avatar,
    Link as MuiLink,
    Toolbar,
    Tooltip,
    Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';

import { version } from '../../package.json';
import { AppBarMenu } from './Menu';

export function AppBar() {
    const baseUrl = process.env.BASE_URL ?? '/';

    return (
        <>
            <MuiAppBar position="fixed">
                <Toolbar>
                    <Tooltip title={`MedBench toolkit v. ${version}`} arrow>
                        <MuiLink
                            component={Link}
                            to="/"
                            color="inherit"
                            style={{ textDecoration: 'none' }}
                        >
                            <Avatar
                                alt="MedBench Toolkit Logo"
                                src={`${baseUrl}favicon.ico`} // Path to your favicon
                                variant="square"
                                sx={{ marginRight: 2 }} // Adds some spacing between the icon and the text
                            />
                        </MuiLink>
                    </Tooltip>
                    <Typography
                        variant="h6"
                        color="inherit"
                        noWrap
                        sx={{ flexGrow: 1, textAlign: 'center' }}
                    >
                        <MuiLink
                            component={Link}
                            to="/"
                            color="inherit"
                            style={{ textDecoration: 'none' }}
                        >
                            MedBench Toolkit
                        </MuiLink>
                    </Typography>
                    <AppBarMenu />
                </Toolbar>
            </MuiAppBar>
            <Toolbar />
            {/* This extra Toolbar is for content offset due to the fixed AppBar */}
        </>
    );
}
