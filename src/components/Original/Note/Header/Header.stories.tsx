import { Paper } from '@mui/material';
import { Meta, StoryObj } from '@storybook/react';
import { buildFakeHeader } from 'components';

import { OriginalNoteHeader } from './Header';

const meta: Meta<typeof OriginalNoteHeader> = {
    title: 'Text/Original/Header',
    component: OriginalNoteHeader,
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
    args: buildFakeHeader(),
};
