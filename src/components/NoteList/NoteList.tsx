import { Paper, styled } from '@mui/material';
import { getChartId } from 'helpers';
import { useState } from 'react';

import { ChooseLanguage } from './ChooseLanguage';
import { NoteListRow } from './NoteListRow';
import { NoteListProps } from './types';

const Th = styled('th')({
    fontWeight: 'bold',
    paddingLeft: '10px',
    paddingRight: '10px',
    borderBottom: '1px solid #979797',
});

export const NoteList = ({
    charts,
    translate,
    uploadTranslation,
    deleteChart,
    setChartName,
    setChartSpecialty,
}: NoteListProps) => {
    const [active, setActive] = useState<Chart>();

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
                </tbody>
            </table>
            <ChooseLanguage
                chart={active}
                cancel={() => setActive(undefined)}
                translate={translate}
            />
        </Paper>
    );
};
