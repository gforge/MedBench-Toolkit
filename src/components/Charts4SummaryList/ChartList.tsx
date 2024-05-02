import {
    Chip,
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
    let specialtiesByLanguage = charts.reduce(
        (acc, chart) => {
            const { specialty, language } = chart;
            const key = `${specialty}@${language}`;
            if (!acc[key]) {
                acc[key] = [];
            }
            acc[key].push(chart);
            return acc;
        },
        {} as Record<string, SummaryChartListProps['charts']>
    );
    specialtiesByLanguage = Object.fromEntries(
        Object.entries(specialtiesByLanguage).sort(([a], [b]) => {
            // "original" is always first
            if (a === 'original') return -1;
            if (b === 'original') return 1;
            return a.localeCompare(b);
        })
    );

    return (
        <Paper sx={{ padding: '10px' }}>
            <Typography variant="h6">Charts for Summary</Typography>
            <Typography variant="body1">Select a chart to summarise</Typography>
            {Object.entries(specialtiesByLanguage).map(([key, charts]) => (
                <TableContainer key={key}>
                    <Typography variant="h6">
                        {key.replace(/@.+/, '')}
                        <Chip
                            label={
                                key.replace(/^.+@/, '') === 'original'
                                    ? 'Original'
                                    : key.replace(/^.+@/, '')
                            }
                            sx={{ marginLeft: '1rem' }}
                        />
                    </Typography>
                    <Table
                        style={{
                            marginBottom: '1em',
                        }}
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Case ID</TableCell>
                                <TableCell>Language</TableCell>
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
