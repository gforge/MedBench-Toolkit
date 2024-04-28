import { Meta } from '@storybook/react';

import { exampleLabValues } from '../LabValues/exampleData';
import { exampleMedications } from '../Medications/exampeData';
import { ChartTabs } from '.';

const meta: Meta<typeof ChartTabs> = {
    title: 'Chart/Tabs',
    component: ChartTabs,
    decorators: (Story) => (
        <div
            style={{
                width: '800px',
                height: '75vh',
                border: '1px solid #ccc',
                padding: '10px',
                overflow: 'auto',
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
        labValues: exampleLabValues,
        notes: ['Note 1', 'Note 2'],
    },
};
