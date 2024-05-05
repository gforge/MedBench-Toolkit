import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@mui/material';
import type { MedicationValue } from 'validators';

import { convertMeds2Rows } from './convertMeds2Rows';

export type MedicationsTableProps = {
    medications: MedicationValue[];
};

export const MedicationsTable = ({
    medications: labValues,
}: MedicationsTableProps) => {
    const { header, rows } = convertMeds2Rows(labValues);

    return (
        <Table size="small">
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
                                        cellIndex > 1 ? 'auto' : 'fit-content',
                                }}
                            >
                                {cell}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};
