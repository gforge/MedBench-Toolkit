import { Meta } from '@storybook/react';

import { ChartTabs } from '.';

const meta: Meta<typeof ChartTabs> = {
    title: 'Chart/Tabs',
    component: ChartTabs,
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
        
    },
};
