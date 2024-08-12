import { EditNote, Translate } from '@mui/icons-material';
import { List, ListItem, ListItemIcon, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export const Greet = () => (
    <Paper
        sx={{ maxWidth: '800px', padding: '1em', margin: 'auto' }}
        elevation={3}
    >
        <Typography variant="h6" sx={{ textDecoration: 'line-through' }}>
            The MedBench Toolkit
        </Typography>
        <Typography
            variant="subtitle1"
            sx={{
                color: 'red',
                fontWeight: 'bold',
                marginBottom: '1em',
            }}
        >
            This repository has been replaced by the <b>MedBench Platform</b>,
            go to <a href="https://label.cairlab.ki.se">label.cairlab.ki.se</a>{' '}
            to access the new platform.
        </Typography>
        <Typography variant="body1">
            This is a collection of tools to help you manage translations for
            your medical charts.
        </Typography>
        <List>
            <ListItem>
                <ListItemIcon>
                    <Translate />
                </ListItemIcon>
                <Link to="/translations">View translations</Link>
            </ListItem>
            <ListItem>
                <ListItemIcon>
                    <EditNote />
                </ListItemIcon>
                <Link to="/summaries">Write case summary</Link>
            </ListItem>
        </List>
    </Paper>
);
