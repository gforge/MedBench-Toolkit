import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
} from '@mui/material';
import dayjs from 'dayjs';
import { LabValue } from 'validators';

import { useTodaysLabValues } from './hooks';

type LabTableProps = {
    labValues: LabValue[];
    currentDay: dayjs.Dayjs;
};

export const LabTable = ({ labValues, currentDay }: LabTableProps) => {
    const todaysLabValues = useTodaysLabValues(labValues, currentDay);

    return (
        <TableContainer
            component={Paper}
            sx={{ width: 'auto', minWidth: '400px' }}
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
                            <TableCell align="center">
                                <span style={{ color: '#888' }}>
                                    {lab.referenceInterval}
                                </span>
                                {previous && (
                                    <span style={{ color: '#888' }}>
                                        (from {previous.value})
                                    </span>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
