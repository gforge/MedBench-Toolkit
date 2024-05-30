import { Close, Menu as MenuIcon } from '@mui/icons-material';
import { Box, Divider, Drawer, IconButton, List } from '@mui/material';
import { useState } from 'react';

import { SettingsMenu } from './SettingsMenu';
import { UserMenu } from './UserMenu';

export function AppBarMenu() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const handleDrawerOpen = () => {
        setDrawerOpen(true);
    };
    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };

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
                        transform: drawerOpen ? 'rotate(90deg)' : 'none',
                        transition: 'transform 0.3s',
                    }}
                    onClick={handleDrawerOpen}
                >
                    <MenuIcon />
                </IconButton>
            </Box>
            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={handleDrawerClose}
            >
                <Box
                    sx={{
                        width: 250,
                        padding: '16px',
                    }}
                >
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <IconButton onClick={handleDrawerClose}>
                            <Close />
                        </IconButton>
                    </Box>
                    <List>
                        <SettingsMenu />
                        <Divider />
                        <UserMenu />
                    </List>
                </Box>
            </Drawer>
        </>
    );
}
