import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@mui/material';
import type { LabValue } from 'validators';

import { convertLab2Rows } from './convertLab2Rows';
import { limitDecimals } from './limitDecimals';

export type LabValueTableProps = {
    labValues: LabValue[];
};

export const LabValueTable = ({ labValues }: LabValueTableProps) => {
    const { header, rows } = convertLab2Rows(labValues);

    return (
        <Table>
            <TableHead>
                <TableRow>
                    {header.map((h, index) => (
                        <TableCell
                            key={index}
                            style={{
                                width: index > 2 ? 'auto' : 'fit-content',
                            }}
                        >
                            {h}
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map((row, rowIndex) => {
                    const refValues = row[2];

                    return (
                        <TableRow key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                                <TableCell
                                    key={cellIndex}
                                    style={{
                                        width:
                                            cellIndex > 2
                                                ? 'auto'
                                                : 'fit-content',
                                        ...flagOutsideReference({
                                            cell,
                                            refValues,
                                            index: cellIndex,
                                        }),
                                    }}
                                >
                                    {cellIndex > 2
                                        ? limitDecimals(cell, 1)
                                        : cell}
                                </TableCell>
                            ))}
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
};

const flagOutsideReference = ({
    cell,
    refValues,
    index,
}: {
    cell: string | number;
    refValues: string | number;
    index: number;
}) => {
    if (typeof refValues !== 'string' || index < 3) {
        return {};
    }

    // Check if reference is a range or a single value with <
    if (/<\s*\d+/.test(refValues)) {
        const max = Number(refValues.replace('<', '').trim());
        if (typeof cell !== 'number') {
            return {};
        }
        if (cell > max) {
            return {
                color: 'darkred',
            };
        }
        return {};
    }

    const [min, max] = refValues.split('-').map(Number);
    if (typeof cell !== 'number') {
        return {};
    }
    if (cell < min || cell > max) {
        return {
            color: 'darkred',
        };
    }
    return {};
};
