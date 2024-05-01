import {
    Paper,
    styled,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import { getChartId } from 'helpers';

import { ChartListRow } from './ChartListRow';
import { SummaryChartListProps } from './types';

const TableContainer = styled('div')({
    overflowX: 'auto',
    marginBottom: '1em',
    '& table': {
        minWidth: 650,
    },
    // Highlight when mouse is over
    backgroundColor: '#ecebeb',
    '&:hover': {
        backgroundColor: '#fff',
    },
    // transition effect
    transition: 'background-color 0.5s ease-in-out',
    padding: '10px',
    borderRadius: '5px',
});

export const Chart4SummaryList = ({
    charts,
    summarise,
}: SummaryChartListProps) => {
    if (!charts.length) return null;

    // Group by specialty
    const specialties = charts.reduce(
        (acc, chart) => {
            const { specialty } = chart;
            if (!acc[specialty]) {
                acc[specialty] = [];
            }
            acc[specialty].push(chart);
            return acc;
        },
        {} as Record<string, SummaryChartListProps['charts']>
    );

    return (
        <Paper sx={{ padding: '10px' }}>
            <Typography variant="h6">Charts for Summary</Typography>
            <Typography variant="body1">Select a chart to summarise</Typography>
            {Object.entries(specialties).map(([specialty, charts]) => (
                <TableContainer key={specialty}>
                    <Typography variant="subtitle1">{specialty}</Typography>
                    <Table
                        style={{
                            marginBottom: '1em',
                        }}
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Case ID</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {charts.map((chart) => (
                                <ChartListRow
                                    key={getChartId(chart)}
                                    chart={chart}
                                    summarise={summarise}
                                />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ))}
        </Paper>
    );
};
