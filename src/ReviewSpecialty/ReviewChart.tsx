import { ChartTabs } from 'components';
import { User } from 'features';
import { useEffect, useState } from 'react';

import { ReviewHeader } from './Header';
import { ReviewNavigator, ReviewNavigatorProps } from './Navigator';
import { ChartBox, FlexBox, ReviewBox } from './styles';
import { SummaryTabs } from './SummaryTabs';
import { ReviewChart as ReviewChartType } from './types';

interface ReviewChartProps
    extends Pick<
        ReviewNavigatorProps,
        'navigateNext' | 'navigateBack' | 'no' | 'specialty' | 'language'
    > {
    chart: ReviewChartType;
    user: User;
}

// If the chart is done, i.e. all ssummaries.reviews are final, then the chart is done
// and move to the next chart, unless it was so from the beginning
const useForwardIfDone = ({
    summaries,
    navigateNext,
}: Pick<ReviewChartProps, 'navigateNext'> & {
    summaries: ReviewChartProps['chart']['summaries'];
}) => {
    const isDone = summaries.every(({ review }) => review?.rating.completed);
    const [wasDone, setWasDone] = useState(isDone);

    useEffect(() => {
        if (isDone && !wasDone && navigateNext) {
            navigateNext();
        }
        setWasDone(isDone);
    }, [isDone, navigateNext, setWasDone, wasDone]);
    return isDone;
};

export const ReviewChart = ({
    chart: {
        chart: { notes, medications, lab },
        summaries,
    },
    specialty,
    language,
    user,
    no,
    navigateNext,
    navigateBack,
}: ReviewChartProps) => {
    const isDone = useForwardIfDone({ summaries, navigateNext });

    return (
        <>
            <ReviewNavigator
                no={no}
                specialty={specialty}
                language={language}
                navigateNext={navigateNext}
                navigateBack={navigateBack}
                isDone={isDone}
            />
            <FlexBox>
                <ChartBox>
                    <ChartTabs
                        notes={notes}
                        medications={medications}
                        labValues={lab}
                    />
                </ChartBox>
                <ReviewBox>
                    <ReviewHeader />
                    <SummaryTabs summaries={summaries} user={user} />
                </ReviewBox>
            </FlexBox>
        </>
    );
};
