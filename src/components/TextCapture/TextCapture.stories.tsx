import { Paper } from '@mui/material';
import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';

import { TextCapture } from './TextCapture';

const meta: Meta<typeof TextCapture> = {
    title: 'Text/Drop',
    component: TextCapture,
    decorators: (Story) => (
        <Paper sx={{ padding: '10px', width: '500px' }}>
            <Story />
        </Paper>
    ),
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {
        charts: [],
        createNewCase: (args: {
            name: string;
            specialty: string;
            notes: Note[];
        }) => {
            console.log(args);
            action('onDrop')(args);
        },
    },
};
