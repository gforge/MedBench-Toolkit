import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Tooltip,
} from '@mui/material';
import dayjs from 'dayjs';
import { MedicationValue } from 'validators';

import { useTodaysMedications } from './hooks';

type MedicationTableProps = {
    medications: MedicationValue[];
    currentDay: dayjs.Dayjs;
};

export const MedicationTable = ({
    medications,
    currentDay,
}: MedicationTableProps) => {
    const todaysMedications = useTodaysMedications(medications, currentDay);

    return (
        <TableContainer
            component={Paper}
            sx={{ width: 'auto', minWidth: '400px' }}
        >
            <Table size="small">
                <TableBody>
                    {todaysMedications.map(
                        ({
                            current: {
                                medication,
                                strength,
                                unit,
                                timesPerDay,
                            },
                            previous,
                        }) => (
                            <TableRow key={`${medication} ${strength} ${unit}`}>
                                <TableCell>{medication}</TableCell>
                                <TableCell
                                    align="right"
                                    sx={{ paddingRight: '0px' }}
                                >
                                    {strength}
                                </TableCell>
                                <TableCell
                                    align="left"
                                    sx={{ paddingLeft: '5px' }}
                                >
                                    {unit}
                                </TableCell>
                                <TimesPerDayCell
                                    currentTimesPerDay={timesPerDay}
                                    previousTimesPerDay={previous?.timesPerDay}
                                />
                            </TableRow>
                        )
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

type TimesPerDayCellProps = {
    currentTimesPerDay?: string;
    previousTimesPerDay?: string;
};

const TimesPerDayCell = ({
    currentTimesPerDay,
    previousTimesPerDay,
}: TimesPerDayCellProps) => {
    if (!currentTimesPerDay) {
        return <TableCell align="center">-</TableCell>;
    }

    if (!previousTimesPerDay || previousTimesPerDay === currentTimesPerDay) {
        return <TableCell align="center">{currentTimesPerDay}</TableCell>;
    }

    return (
        <TableCell align="center">
            <Tooltip title={`Previously ${previousTimesPerDay}`}>
                <span>{currentTimesPerDay} *</span>
            </Tooltip>
        </TableCell>
    );
};
