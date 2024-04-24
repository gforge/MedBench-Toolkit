import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css';

import { Translate } from '@mui/icons-material';
import { List, ListItem, ListItemIcon, Paper, Typography } from '@mui/material';
import { loadData } from 'helpers';
import { Link, Route, Routes } from 'react-router-dom';

import { Translations } from './Translations';
import { Translator } from './Translator';

function App() {
    console.log(loadData())
    return (
        <>
            <header>MedBench toolkit</header>
            <div className="content">
                <Routes>
                    <Route path="/" element={<Greet />} />
                    <Route path="/translations" element={<Translations />} />
                    <Route
                        path="/translator/:chartId/:language"
                        element={<Translator />}
                    />
                </Routes>
            </div>
        </>
    );
}

const Greet = () => (
    <Paper sx={{ maxWidth: '800px', padding: '1em' }} elevation={3}>
        <Typography variant="h6">The MedBench Toolkit</Typography>
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
        </List>
    </Paper>
);

export default App;
