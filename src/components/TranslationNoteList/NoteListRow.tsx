import { Delete } from '@mui/icons-material';
import { Button, ButtonGroup, Stack, TableRow } from '@mui/material';
import { useFilteredCharts } from 'features';
import { getChartId } from 'helpers';
import { useCallback, useMemo } from 'react';

import { EditableTd } from './EditableTd';
import { LanguageButton } from './LanguageButton';
import { StyledTd as Td } from './StyledTd';
import { NoteListRowProps } from './types';
import { UploadTranslationButton } from './UploadTranslationButton';

export const NoteListRow = ({
    chart,
    translate,
    uploadTranslation,
    deleteChart,
    setActive,
    setChartName,
    setChartSpecialty,
}: NoteListRowProps) => {
    const charts = useFilteredCharts(chart);
    const translations = useMemo(() => {
        const languages = charts
            .filter((c) => c.language !== 'original')
            .map((c) => c.language);
        return Array.from(new Set(languages)).sort((a, b) =>
            a.localeCompare(b)
        );
    }, [charts]);
    const setName = useCallback(
        (name: string) => {
            setChartName({ id: getChartId(chart), name });
        },
        [chart, setChartName]
    );
    const setSpecialty = useCallback(
        (specialty: string) => {
            setChartSpecialty({ id: getChartId(chart), specialty });
        },
        [chart, setChartSpecialty]
    );

    const borderBottom = '1px solid #ccc';
    const { name, specialty } = chart;
    return (
        <TableRow
            style={{
                borderBottom,
            }}
        >
            <EditableTd text={name} setText={setName} />
            <EditableTd text={specialty} setText={setSpecialty} />
            <Td
                style={{
                    textAlign: 'left',
                }}
            >
                <ButtonGroup>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setActive(chart)}
                        size="small"
                    >
                        Translate
                    </Button>
                    {translations.map((language) => (
                        <LanguageButton
                            key={language}
                            language={language}
                            chart={chart}
                            translate={translate}
                            deleteChart={deleteChart}
                        />
                    ))}
                    <UploadTranslationButton
                        chart={chart}
                        upload={uploadTranslation}
                    />
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => deleteChart({ id: getChartId(chart) })}
                        size="small"
                    >
                        <Stack direction="row" alignItems="center" gap={1}>
                            <Delete />
                            Delete
                        </Stack>
                    </Button>
                </ButtonGroup>
            </Td>
        </TableRow>
    );
};
