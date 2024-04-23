import { ArrowRight } from '@mui/icons-material';
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper,
    Typography,
} from '@mui/material';

export const TranslationsOverviewHelp = ({ show }: { show: boolean }) => {
    if (!show) return null;

    return (
        <Paper sx={{ marginTop: '2em', padding: '1em', maxWidth: '600px' }}>
            <Typography variant="h5">Background</Typography>
            <Typography variant="body1">
                This application is designed to help you translate medical notes
                from one language to another.
            </Typography>
            <Typography variant="h5" sx={{ marginTop: '1em' }}>
                Instructions
            </Typography>
            <Typography variant="body1">
                You start with a blank slate. Click the "Create new case" button
                to get started. This will open a dialog where you can enter the
                case name, specialty, and original notes.
            </Typography>
            <Typography variant="body1">
                The name and specialty are mostly for your reference only. The
                original notes are what you will be translating. These notes are
                copy-pasted into the text area. They should follow the note
                format defined in the study protocol, in short:
            </Typography>
            <List>
                <ListItem>
                    <ListItemIcon>
                        <ArrowRight />
                    </ListItemIcon>
                    <ListItemText
                        primary="Each section is separated by a main header, designated with a single hash (#)."
                        secondary="E.g. # ED admission note, 2021-09-01, 10:00, Dr. Smith"
                    />
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <ArrowRight />
                    </ListItemIcon>
                    <ListItemText
                        primary="This is followed by a subheader, designated with two hashes (##)."
                        secondary=" E.g. ## Chief Complaint"
                    />
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <ArrowRight />
                    </ListItemIcon>
                    <ListItemText
                        primary="The notes themselves are written in plain text."
                        secondary="E.g. Hip pain..."
                    />
                </ListItem>
            </List>
            <Typography variant="body1">
                Note that all the data is stored locally in your browser. If you
                switch computers or browsers, you will not have access to your
                cases.
            </Typography>
            <Typography variant="body1" marginTop={'10px'}>
                The data can be exported and imported as a JSON file, the dump
                is saved with the file ending <strong>.mbc</strong>. This can be
                useful for backup purposes or for sharing cases with others. You
                can also upload single <strong>.mb</strong> files to load a
                case.
            </Typography>
        </Paper>
    );
};
