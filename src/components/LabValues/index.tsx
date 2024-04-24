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
                {rows.map((row, rowIndex) => (
                    <TableRow key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                            <TableCell
                                key={cellIndex}
                                style={{
                                    width:
                                        cellIndex > 2 ? 'auto' : 'fit-content',
                                }}
                            >
                                {cellIndex > 2 ? limitDecimals(cell, 1) : cell}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};
