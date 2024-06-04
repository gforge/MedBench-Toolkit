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
            <Tabs
                value={tabIndex}
                onChange={handleTabChange}
                sx={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                    background: 'white',
                }}
            >
                {summaries.map(({ summary: { summaryId } }, index) => (
                    <Tab key={summaryId} label={`Version ${index + 1}`} />
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
