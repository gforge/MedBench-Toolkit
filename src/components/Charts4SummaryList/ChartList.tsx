import { Paper, styled } from '@mui/material';
import { getChartId } from 'helpers';

import { ChartListRow } from './ChartListRow';
import { SummaryChartListProps } from './types';

const Th = styled('th')({
    fontWeight: 'bold',
    paddingLeft: '10px',
    paddingRight: '10px',
    borderBottom: '1px solid #979797',
});

export const Chart4SummaryList = ({
    charts,
    summarise,
}: SummaryChartListProps) => {
    if (!charts.length) return null;

    return (
        <Paper sx={{ padding: '10px' }}>
            <table
                style={{
                    borderCollapse: 'collapse',
                }}
            >
                <thead>
                    <tr>
                        <Th>Name</Th>
                        <Th>Specialty</Th>
                        <Th>Actions</Th>
                    </tr>
                </thead>
                <tbody>
                    {charts.map((chart) => (
                        <ChartListRow
                            key={getChartId(chart)}
                            chart={chart}
                            summarise={summarise}
                        />
                    ))}
                </tbody>
            </table>
        </Paper>
    );
};
