import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    List,
    ListItemTextProps,
    Typography,
} from '@mui/material';

import { DialogListItem } from './DialogListItem';
import { EvaluationCriteria } from './EvaluationCriteria';

export const EvaluationInstructionDialog = ({
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
