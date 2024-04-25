import { Meta } from '@storybook/react';
import dayjs from 'dayjs';

import { MedicationsTable } from '.';

const meta: Meta<typeof MedicationsTable> = {
    title: 'Chart/MedicationsTable',
    component: MedicationsTable,
    decorators: (Story) => (
        <div
            style={{
                minWidth: '800px',
                height: '100%',
                border: '1px solid #ccc',
                padding: '10px',
            }}
        >
            <Story />
        </div>
    ),
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;

const today = dayjs();

export const Short = {
    args: {
        medications: [
            {
                Medication: 'Paracetamol',
                'Way of adminstration': 'Oral',
                Unit: 'g',
                Strength: 1,
                'Times per day': '1+1+1',
                timestamp: today,
            },
            {
                Medication: 'Paracetamol',
                'Way of adminstration': 'Oral',
                Unit: 'g',
                Strength: 1,
                'Times per day': '1+1+1',
                timestamp: today.add(1, 'day'),
            },
            {
                Medication: 'Paracetamol',
                'Way of adminstration': 'Oral',
                Unit: 'g',
                Strength: 1,
                'Times per day': '1+0+1',
                timestamp: today.add(2, 'day'),
            },
            {
                Medication: 'Paracetamol',
                'Way of adminstration': 'Oral',
                Unit: 'g',
                Strength: 1,
                'Times per day': 'x',
                timestamp: today.add(3, 'day'),
            },
            {
                Medication: 'Heracillin',
                'Way of adminstration': 'Oral',
                Unit: 'mg',
                Strength: 500,
                'Times per day': '2+2+2',
                timestamp: today.add(2, 'day'),
            },
            {
                Medication: 'Heracillin',
                'Way of adminstration': 'Oral',
                Unit: 'mg',
                Strength: 500,
                'Times per day': '2+2+2',
                timestamp: today.add(3, 'day'),
            },
        ],
    },
};
