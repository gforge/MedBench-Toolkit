import { ArrowRightOutlined, Info } from '@mui/icons-material';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListItemTextProps,
    Tooltip,
    Typography,
    TypographyProps,
} from '@mui/material';
import { useState } from 'react';

export const SummaryInstructions = () => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <Tooltip title="Instructions for writing a summary">
                <span>
                    <Button
                        startIcon={<Info />}
                        variant={open ? 'contained' : 'outlined'}
                        size="small"
                        onClick={() => setOpen(true)}
                    >
                        Info
                    </Button>
                </span>
            </Tooltip>
            <SummaryInstructionDialog open={open} setOpen={setOpen} />
        </>
    );
};

const SummaryInstructionDialog = ({
    open,
    setOpen,
}: {
    open: boolean;
    setOpen: (value: boolean) => void;
}) => {
    const bodyVariant = 'body1';

    const listItems: Pick<ListItemTextProps, 'primary' | 'secondary'>[] = [
        { primary: 'History of Presenting Illness' },
        { primary: 'Past Medical History' },
        {
            primary: 'Medications',
            secondary: 'Especially changes in medications should be documented',
        },
        {
            primary: 'Performed surgeries or procedures',
            secondary: 'diagnostic codes together with text description',
        },
        { primary: 'Key examinations', secondary: 'e.g. CT, MRI' },
        {
            primary: 'Treatment course',
            secondary: 'i.e. what has happened during the stay',
        },
        {
            primary: 'Plan after discharge',
            secondary: 'e.g. additional visits, referrals, suture removals',
        },
    ];
    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Instructions for writing a summary
            </DialogTitle>
            <DialogContent>
                <Typography variant={bodyVariant} sx={{ mb: '.5rem' }}>
                    Please write a summary of the patient's chart in the text
                    box below. Once you are don you can export the summary to a
                    markdown text file by clicking the "Export" button and
                    e-mail it to Max Gordon.
                </Typography>
                <Typography variant={bodyVariant} sx={{ mb: '.5rem' }}>
                    The summary should be written in a style that is used at{' '}
                    <em>your</em> hospital. We recommend including the following
                    sections:
                </Typography>
                <List dense>
                    {listItems.map((item, index) => (
                        <DialogListItem key={index} {...item} />
                    ))}
                </List>
                <Typography
                    variant={bodyVariant}
                    sx={{
                        mb: '.5rem',
                    }}
                >
                    You can use the notes, medications, and lab values from the
                    chart to help you write the summary.
                </Typography>
                <MarkdownTemplate variant={bodyVariant} />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)} autoFocus>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const DialogListItem = ({
    primary,
    secondary,
}: Pick<ListItemTextProps, 'primary' | 'secondary'>) => (
    <ListItem>
        <ListItemIcon>
            <ArrowRightOutlined />
        </ListItemIcon>
        <ListItemText primary={primary} secondary={secondary} />
    </ListItem>
);

const MarkdownTemplate = ({ variant }: Pick<TypographyProps, 'variant'>) => (
    <>
        <Typography variant={variant}>
            Here is a template for the markdown structure:
        </Typography>
        <pre
            style={{
                padding: '1em',
                border: '1px solid #ccc',
                borderRadius: '5px',
                backgroundColor: '#f5f5f5',
                whiteSpace: 'pre-wrap',
            }}
        >
            {`# Diagnosis
            ## Main diagnosis (name and ICD code)

            ## Differential diagnosis (name and ICD code)

            # Surgery or procedures  (name and precedural code)

            # History of presenting illness

            # Past medical history

            # Treatment course

            # Plan after discharge
            `
                .replace(/^\s+/gm, '')
                // Add new line to remove leading whitespace
                .replace(/\n/g, '\n\n')}
        </pre>
    </>
);
