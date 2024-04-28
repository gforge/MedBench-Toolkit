import { Meta } from '@storybook/react';

import { LabValueTable } from '.';
import { exampleLabValues } from './exampleData';

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

export const Short = {
    args: {
        labValues: exampleLabValues,
    },
};
