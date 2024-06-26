import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import { getChartId } from 'helpers';
import { useState } from 'react';

import { ChooseLanguage } from './ChooseLanguage';
import { NoteListRow } from './NoteListRow';
import { NoteListProps } from './types';

export const TranslationNoteList = ({
    charts,
    translate,
    uploadTranslation,
    deleteChart,
    setChartName,
    setChartSpecialty,
}: NoteListProps) => {
    const [active, setActive] = useState<Chart>();

    if (!charts.length) return null;

    const chartBySpecialty = charts.reduce(
        (acc, chart) => {
            if (!acc[chart.specialty]) {
                acc[chart.specialty] = [];
            }
            acc[chart.specialty].push(chart);
            return acc;
        },
        {} as Record<string, Chart[]>
    );

    return (
        <Paper sx={{ padding: '10px' }}>
            {Object.entries(chartBySpecialty).map(([specialty, charts]) => (
                <Paper
                    key={specialty}
                    sx={{ marginBottom: '20px', padding: '1rem' }}
                >
                    <Typography variant="h4">{specialty}</Typography>
                    <Table
                        style={{
                            borderCollapse: 'collapse',
                        }}
                        size="small"
                        sx={{ width: 'auto' }}
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell>Specialty</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {charts.map((chart) => (
                                <NoteListRow
                                    key={getChartId(chart)}
                                    chart={chart}
                                    translate={translate}
                                    uploadTranslation={uploadTranslation}
                                    deleteChart={deleteChart}
                                    setActive={setActive}
                                    setChartName={setChartName}
                                    setChartSpecialty={setChartSpecialty}
                                />
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            ))}
            <ChooseLanguage
                chart={active}
                cancel={() => setActive(undefined)}
                translate={translate}
            />
        </Paper>
    );
};
