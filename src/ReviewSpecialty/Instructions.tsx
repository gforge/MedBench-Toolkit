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

export const ReviewInstructions = () => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <Tooltip title="Instructions for evaluating fictional medical charts">
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
            <EvaluationInstructionDialog open={open} setOpen={setOpen} />
        </>
    );
};

const EvaluationInstructionDialog = ({
    open,
    setOpen,
}: {
    open: boolean;
    setOpen: (value: boolean) => void;
}) => {
    const bodyVariant = 'body1';

    const listItems: Pick<ListItemTextProps, 'primary' | 'secondary'>[] = [
        {
            primary: 'Medical Accuracy',
            secondary:
                'Assess the accuracy of diagnoses, past medical history, and hospital courses.',
        },
        {
            primary: 'Conciseness and Completeness',
            secondary:
                'Evaluate whether the summaries include all critical information without unnecessary details.',
        },
        {
            primary: 'Language and Clarity',
            secondary:
                'Ensure the language used is clear and understandable and the information is logically organized.',
        },
        {
            primary: 'Factual Inconsistencies (Hallucinations)',
            secondary:
                'Identify any factual inaccuracies or inconsistencies in the charts.',
        },
    ];
    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth="md"
        >
            <DialogTitle id="alert-dialog-title">
                Instructions for Evaluating Medical Charts
            </DialogTitle>
            <DialogContent>
                <Typography variant={bodyVariant} sx={{ mb: '.5rem' }}>
                    Welcome and thank you for joining our project to evaluate
                    fictional medical charts. Your expertise as healthcare
                    professionals is invaluable in ensuring the accuracy,
                    clarity, and completeness of these records.
                </Typography>
                <Typography variant={bodyVariant} sx={{ mb: '.5rem' }}>
                    The primary objective of this evaluation is to assess the
                    quality of fictional Electronic Health Records (EHRs)
                    generated for the MedBench dataset. Your evaluations will
                    help us understand how well these models can produce
                    concise, accurate, and complete medical summaries which are
                    essential for effective patient care and communication among
                    healthcare providers.
                </Typography>
                <Typography variant={bodyVariant} sx={{ mb: '.5rem' }}>
                    Accurate and concise medical summaries are crucial for
                    several reasons: improving patient safety, ensuring
                    continuity of care, and enhancing efficiency.
                </Typography>
                <Typography variant={bodyVariant} sx={{ mb: '.5rem' }}>
                    We will rely on standards from the NHS and the Swedish
                    National Board of Health and Welfare guidelines (HSLF-FS
                    2016:40), with minor adaptations for this study.
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
                    Your role is to review each medical chart and provide
                    ratings based on the form questions. Your insights and
                    feedback will be crucial in refining the dataset and
                    improving the performance of LLMs in medical documentation
                    tasks.
                </Typography>
                <EvaluationCriteria variant={bodyVariant} />
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

const EvaluationCriteria = ({ variant }: Pick<TypographyProps, 'variant'>) => {
    const criteria: { primary: string; secondary: string[] }[] = [
        {
            primary: 'Medical Accuracy',
            secondary: [
                'Diagnosis: Major factual errors to Completely accurate',
                'Past medical history: Major factual errors to Completely accurate',
                'Hospital course: Major factual errors to Completely accurate',
                'Planned follow-up: Major factual errors to Completely accurate',
            ],
        },
        {
            primary: 'Conciseness and Completeness',
            secondary: [
                'Conciseness: Very poorly summarised to Very well summarised',
                'Completeness: Very poorly summarised to Very well summarised',
            ],
        },
        {
            primary: 'Language and Clarity',
            secondary: [
                'Language: Not understandable to Completely understandable',
                'Clarity: Very unclear to Very clear',
            ],
        },
        {
            primary: 'Hallucinations',
            secondary: [
                'Number of hallucinations: >4 to None',
                'Exemplify which hallucinations you found',
            ],
        },
        {
            primary: 'Overall',
            secondary: [
                'Overall score: Unusable to Superhuman or excellent performance',
                'General comments: Free text',
            ],
        },
    ];

    return (
        <>
            <Typography variant={variant} gutterBottom>
                Here are the evaluation criteria:
            </Typography>
            <List dense>
                {criteria.map((criterion, index) => (
                    <ListItem key={index} alignItems="flex-start">
                        <ListItemText
                            primary={criterion.primary}
                            secondary={
                                <List dense>
                                    {criterion.secondary.map(
                                        (text, subIndex) => (
                                            <ListItem key={subIndex}>
                                                <ListItemIcon>
                                                    <ArrowRightOutlined />
                                                </ListItemIcon>
                                                <ListItemText primary={text} />
                                            </ListItem>
                                        )
                                    )}
                                </List>
                            }
                        />
                    </ListItem>
                ))}
            </List>
        </>
    );
};
