import { TrendingDown, TrendingUp } from '@mui/icons-material';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableContainerProps,
    TableRow,
    Tooltip,
    Zoom,
} from '@mui/material';
import dayjs from 'dayjs';
import { LabValue } from 'validators';

import { useTodaysLabValues } from './hooks';

type LabTableProps = {
    labValues: LabValue[];
    currentDay: dayjs.Dayjs;
    first: boolean;
};

export const LabTable = ({
    labValues,
    currentDay,
    first,
    ref,
}: LabTableProps & Pick<TableContainerProps, 'ref'>) => {
    const todaysLabValues = useTodaysLabValues({
        labValues,
        currentDay,
        first,
    });

    return (
        <TableContainer
            component={Paper}
            sx={{ width: 'auto', minWidth: '400px' }}
            ref={ref}
        >
            <Table size="small">
                <TableBody>
                    {todaysLabValues.map(({ current: lab, previous }) => (
                        <TableRow key={lab.labTest}>
                            <TableCell>{lab.labTest}</TableCell>
                            <TableCell align="right">{lab.value}</TableCell>
                            <TableCell align="left">
                                <span style={{ color: '#888' }}>
                                    {lab.unit}
                                </span>
                            </TableCell>
                            <TableCell align="right" sx={{ padding: '0' }}>
                                <TrendIndicator lab={lab} previous={previous} />
                            </TableCell>
                            <TableCell align="center" sx={{ color: '#888' }}>
                                <span>{lab.referenceInterval}</span>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

const TrendIndicator = ({
    lab,
    previous,
}: {
    lab: LabValue;
    previous?: LabValue;
}) => {
    if (!previous) {
        return null;
    }
    const { value } = lab;
    const { value: previousValue, date, time } = previous;

    const labValueNum = parseFloat(value);
    const previousValueNum = parseFloat(previousValue);
    if (isNaN(labValueNum) || isNaN(previousValueNum)) {
        return null;
    }

    if (labValueNum > previousValueNum) {
        return (
            <Tooltip
                TransitionComponent={Zoom}
                enterDelay={500}
                leaveDelay={200}
                title={
                    <span>
                        Trending up from <strong>{previousValue}</strong> on the{' '}
                        <em>
                            {date}&nbsp;{time}
                        </em>
                    </span>
                }
            >
                <TrendingUp style={{ color: '#757575', marginLeft: '5px' }} />
            </Tooltip>
        );
    }

    if (labValueNum < previousValueNum) {
        return (
            <Tooltip
                TransitionComponent={Zoom}
                enterDelay={500}
                leaveDelay={200}
                title={
                    <span>
                        Trending down from <strong>{previousValue}</strong> on
                        the{' '}
                        <em>
                            {date}&nbsp;{time}
                        </em>
                    </span>
                }
            >
                <TrendingDown style={{ color: '#757575', marginLeft: '5px' }} />
            </Tooltip>
        );
    }

    return null;
};
