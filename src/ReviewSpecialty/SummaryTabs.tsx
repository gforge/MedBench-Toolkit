import { Stack, Tab, Tabs } from '@mui/material';
import { MarkdownTypography } from 'components';
import type { Summary } from 'features';
import { useState } from 'react';

import { EvaluationForm } from './Form';

interface SummaryTabsProps {
    summaries: { summary: Summary }[];
}

export const SummaryTabs = ({ summaries }: SummaryTabsProps) => {
    const [tabIndex, setTabIndex] = useState(0);

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setTabIndex(newValue);
    };

    return (
        <div>
            <Stack
                direction="row"
                spacing={2}
                justifyContent="space-between"
                sx={{ marginBottom: '10px' }}
            ></Stack>
            <Tabs value={tabIndex} onChange={handleTabChange}>
                {summaries.map((summary) => (
                    <Tab
                        key={summary.summary.summaryId}
                        label={summary.summary.summaryId}
                    />
                ))}
            </Tabs>
            {summaries.map((summary, index) => (
                <div
                    key={summary.summary.summaryId}
                    hidden={tabIndex !== index}
                >
                    {tabIndex === index && (
                        <>
                            <MarkdownTypography
                                content={summary.summary.text}
                            />
                            <EvaluationForm />
                        </>
                    )}
                </div>
            ))}
        </div>
    );
};
