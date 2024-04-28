import { Paper } from '@mui/material';
import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';
import { buildFakeNoteHeader } from 'components';

import { TranslationNoteHeader } from './Header';

const meta: Meta<typeof TranslationNoteHeader> = {
    title: 'Text/Translation/Header',
    component: TranslationNoteHeader,
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
        ...buildFakeNoteHeader(),
        onTypeChange: action('onTypeChange'),
    },
};
