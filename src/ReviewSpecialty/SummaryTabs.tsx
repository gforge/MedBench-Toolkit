import { Stack, Tab, Tabs } from '@mui/material';
import { MarkdownTypography } from 'components';
import type { Review, Summary, User } from 'features';
import { useState } from 'react';

import { EvaluationForm } from './Form';

interface SummaryTabsProps {
    summaries: { summary: Summary; review: Review | undefined }[];
    user: User;
}

export const SummaryTabs = ({ summaries, user }: SummaryTabsProps) => {
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
            {summaries.map(
                ({ summary: { summaryId, text, chartId }, review }, index) => (
                    <div key={summaryId} hidden={tabIndex !== index}>
                        {tabIndex === index && (
                            <>
                                <MarkdownTypography content={text} />
                                <EvaluationForm
                                    chartId={chartId}
                                    summaryId={summaryId}
                                    user={user}
                                    review={review}
                                />
                            </>
                        )}
                    </div>
                )
            )}
        </div>
    );
};
