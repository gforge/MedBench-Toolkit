import { ArrowRightOutlined } from '@mui/icons-material';
import {
    List,
    ListItem,
    ListItemText,
    Typography,
    TypographyProps,
} from '@mui/material';

export const EvaluationCriteria = ({
    variant,
}: Pick<TypographyProps, 'variant'>) => {
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
                'Number of hallucinations: None to >4 significant inaccuracies',
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
                                <>
                                    {criterion.secondary.map(
                                        (text, subIndex) => (
                                            <Typography
                                                key={subIndex}
                                                component="span"
                                                variant="body2"
                                                display="block"
                                                sx={{ ml: 4, mt: 1 }}
                                            >
                                                <ArrowRightOutlined
                                                    sx={{
                                                        verticalAlign: 'middle',
                                                        mr: 1,
                                                    }}
                                                />
                                                {text}
                                            </Typography>
                                        )
                                    )}
                                </>
                            }
                        />
                    </ListItem>
                ))}
            </List>
        </>
    );
};
