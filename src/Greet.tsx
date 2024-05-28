import { EditNote, RateReview, Translate } from '@mui/icons-material';
import { List, ListItem, ListItemIcon, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export const Greet = () => (
    <Paper
        sx={{ maxWidth: '800px', padding: '1em', margin: 'auto' }}
        elevation={3}
    >
        <Typography variant="h6">The MedBench Toolkit</Typography>
        <Typography variant="body1">
            This is a collection of tools to prepare, translate and review
            medical summaries in multiple languages.
        </Typography>
        <List>
            <ListItem>
                <ListItemIcon>
                    <RateReview />
                </ListItemIcon>
                <Link to="/review">Review summaries</Link>
            </ListItem>
            <ListItem>
                <ListItemIcon>
                    <EditNote />
                </ListItemIcon>
                <Link to="/summaries">Write case summary</Link>
            </ListItem>
            <ListItem>
                <ListItemIcon>
                    <Translate />
                </ListItemIcon>
                <Link to="/translations">View translations</Link>
            </ListItem>
        </List>
    </Paper>
);
