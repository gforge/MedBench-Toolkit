import { ChartTabs } from 'components';
import { User } from 'features';

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
    return (
        <>
            <ReviewNavigator
                no={no}
                specialty={specialty}
                language={language}
                navigateNext={navigateNext}
                navigateBack={navigateBack}
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
