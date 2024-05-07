import {
    AppBar as MuiAppBar,
    Avatar,
    Box,
    Container,
    Link as MuiLink,
    Toolbar,
    Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';

import { version } from '../package.json';

export function AppBar() {
    const baseUrl = process.env.BASE_URL ?? '/';

    return (
        <>
            <MuiAppBar position="fixed">
                <Container maxWidth="xl">
                    <Toolbar>
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
                        <Box sx={{ flexGrow: 0 }}>
                            <Typography
                                variant="caption"
                                sx={{ fontSize: '0.8em' }}
                            >
                                v. {version}
                            </Typography>
                        </Box>
                    </Toolbar>
                </Container>
            </MuiAppBar>
            <Toolbar />
            {/* This extra Toolbar is for content offset due to the fixed AppBar */}
        </>
    );
}
