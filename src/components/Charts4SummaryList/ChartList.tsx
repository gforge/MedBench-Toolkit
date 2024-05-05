import {
    Box,
    Chip,
    Paper,
    Stack,
    styled,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import { getChartId } from 'helpers';
import { useMemo, useState } from 'react';

import { ChartListRow } from './ChartListRow';
import { SummaryChartListProps } from './types';

const TableContainer = styled('div')({
    overflowX: 'auto',
    marginBottom: '1em',
    '& table': {
        minWidth: 650,
    },
    // Highlight when mouse is over
    backgroundColor: '#f9f9f9',
    borderLeft: '2px solid #00000000',
    '&:hover': {
        backgroundColor: '#fff',
        borderLeft: '2px solid #00000011',
    },
    // transition effect
    transition:
        'background-color 0.5s ease-in-out, border-left 0.5s ease-in-out',
    padding: '10px',
    borderRadius: '5px',
});

export const Chart4SummaryList = ({
    charts,
    summarise,
}: SummaryChartListProps) => {
    const { specialtyKeys, specialtiesByLanguage } = useMemo(() => {
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
        return {
            specialtyKeys: Array.from(
                new Set(charts.map((chart) => chart.specialty))
            ),
            specialtiesByLanguage,
        };
    }, [charts]);
    const [selectedSpecialties, setSelectedSpecialties] =
        useState(specialtyKeys);

    if (!charts.length) return null;

    return (
        <Paper sx={{ padding: '10px' }}>
            <Box sx={{ marginBottom: '10px' }}>
                <Typography variant="h6">Charts for Summary</Typography>
                <Typography variant="body1">
                    Select a chart to summarise
                </Typography>
                <Stack direction="row" gap={1}>
                    {Array.from(specialtyKeys).map((specialty) => (
                        <Chip
                            key={specialty}
                            label={specialty}
                            onClick={() => {
                                if (selectedSpecialties.includes(specialty)) {
                                    setSelectedSpecialties(
                                        selectedSpecialties.filter(
                                            (s) => s !== specialty
                                        )
                                    );
                                } else {
                                    setSelectedSpecialties([
                                        ...selectedSpecialties,
                                        specialty,
                                    ]);
                                }
                            }}
                            color={
                                selectedSpecialties.includes(specialty)
                                    ? 'primary'
                                    : 'default'
                            }
                        />
                    ))}
                </Stack>
            </Box>
            {Object.entries(specialtiesByLanguage)
                .filter(([specialty]) =>
                    selectedSpecialties.includes(specialty.replace(/@.+/, ''))
                )
                .map(([key, charts]) => (
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
