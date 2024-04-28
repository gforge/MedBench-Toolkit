import { Button, ButtonGroup } from '@mui/material';
import { getChartId } from 'helpers';

import { StyledTd as Td } from './StyledTd';
import { SummaryChartListRowProps } from './types';

export const ChartListRow = ({
    chart,
    summarise,
}: SummaryChartListRowProps) => {
    const borderBottom = '1px solid #ccc';
    const { case_id: caseId, specialty } = chart;
    return (
        <tr style={{ borderBottom }}>
            <Td>{specialty}</Td>
            <Td>{caseId}</Td>
            <Td
                style={{
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
            </Td>
        </tr>
    );
};
