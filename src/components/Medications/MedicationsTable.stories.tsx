import { Meta } from '@storybook/react';

import { MedicationsTable } from '.';
import { exampleMedications } from './exampeData';

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

export const Short = {
    args: {
        medications: exampleMedications,
    },
};
