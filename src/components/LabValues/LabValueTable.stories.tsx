import { faker } from '@faker-js/faker';
import { Meta } from '@storybook/react';

import { LabValueTable } from '.';

const meta: Meta<typeof LabValueTable> = {
    title: 'Chart/LabValueTable',
    component: LabValueTable,
    decorators: (Story) => (
        <div
            style={{
                width: '1200px',
                height: '100%',
                border: '1px solid red',
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

export const Short = {
    args: {
        labValues: Array(5).fill(null).map(() => ({ 
            "Lab test": "test",
            "Reference interval": "0-120",
            Unit: "unit",
            Value: faker.datatype.number(),
            timestamp: new Date(),
        })),
    },
};
