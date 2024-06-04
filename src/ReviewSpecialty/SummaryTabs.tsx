import { Tab, Tabs } from '@mui/material';
import { MarkdownTypography } from 'components';
import { type Review, reviewsActions, type Summary, type User } from 'features';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { type Rating } from 'validators';

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

    const dispatch = useDispatch();
    const prepOnSubmit = useCallback(
        ({ chartId, summaryId }: { chartId: string; summaryId: string }) =>
            ({
                partial,
                ...rating
            }: Omit<Rating, 'completed'> & { partial?: boolean }) => {
                dispatch(
                    reviewsActions.review({
                        chartId,
                        summaryId,
                        userMainEmail: user.userMainEmail,
                        rating,
                    })
                );
                if (!partial && tabIndex < summaries.length - 1) {
                    setTabIndex((prev) => prev + 1);
                }
            },
        [dispatch, user.userMainEmail, tabIndex, summaries.length]
    );

    return (
        <div>
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
                                    key={`chart-${chartId}-summary-${summaryId}`}
                                    review={review}
                                    onSubmit={prepOnSubmit({
                                        chartId,
                                        summaryId,
                                    })}
                                />
                            </>
                        )}
                    </div>
                )
            )}
        </div>
    );
};
