import { Button, ButtonGroup, TableCell, TableRow } from '@mui/material';
import { getChartId } from 'helpers';

import { SummaryChartListRowProps } from './types';

export const ChartListRow = ({
    chart,
    summarise,
}: SummaryChartListRowProps) => {
    const borderBottom = '1px solid #ccc';
    const { name, specialty, language } = chart;
    return (
        <TableRow style={{ borderBottom }}>
            <TableCell>{specialty}</TableCell>
            <TableCell>{name}</TableCell>
            <TableCell>
                {language == 'original' ? 'Original' : language}
            </TableCell>
            <TableCell
                sx={{
                    textAlign: 'left',
                }}
            >
                <ButtonGroup>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() =>
                            summarise({
                                chartId: getChartId(chart),
                            })
                        }
                    >
                        Summarise
                    </Button>
                </ButtonGroup>
            </TableCell>
        </TableRow>
    );
};
