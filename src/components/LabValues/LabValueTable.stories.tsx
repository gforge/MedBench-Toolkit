import { faker } from '@faker-js/faker';
import { Meta } from '@storybook/react';
import dayjs from 'dayjs';

import { LabValueTable } from '.';

const meta: Meta<typeof LabValueTable> = {
    title: 'Chart/LabValueTable',
    component: LabValueTable,
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
        labValues: [
            {
                'Lab test': 'Hb',
                'Reference interval': '120-140',
                Unit: 'mg/dL',
                Value: faker.number.float({ min: 80, max: 120 }),
                timestamp: today,
            },
            {
                'Lab test': 'Hb',
                'Reference interval': '120-140',
                Unit: 'mg/dL',
                Value: faker.number.float({ min: 80, max: 120 }),
                timestamp: today.add(2, 'day'),
            },
            {
                'Lab test': 'WBC',
                'Reference interval': '4-7',
                Unit: 'mmol/L',
                Value: faker.number.float({ min: 1, max: 30 }),
                timestamp: today.add(1, 'day'),
            },
            {
                'Lab test': 'WBC',
                'Reference interval': '4-7',
                Unit: 'mmol/L',
                Value: faker.number.float({ min: 1, max: 30 }),
                timestamp: today.add(2, 'day'),
            },
        ],
    },
};
