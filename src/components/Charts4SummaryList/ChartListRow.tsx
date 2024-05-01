import { Button, ButtonGroup, TableCell, TableRow } from '@mui/material';
import { getChartId } from 'helpers';

import { SummaryChartListRowProps } from './types';

export const ChartListRow = ({
    chart,
    summarise,
}: SummaryChartListRowProps) => {
    const borderBottom = '1px solid #ccc';
    const { case_id: caseId, specialty } = chart;
    return (
        <TableRow style={{ borderBottom }}>
            <TableCell>{specialty}</TableCell>
            <TableCell>{caseId}</TableCell>
            <TableCell
                sx={{
                    textAlign: 'left',
                }}
            >
                <ButtonGroup>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => summarise(getChartId(chart))}
                    >
                        Summarise
                    </Button>
                </ButtonGroup>
            </TableCell>
        </TableRow>
    );
};
