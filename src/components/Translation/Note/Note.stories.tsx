import { Box } from '@mui/material';
import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { buildFakeNote } from 'components';

import { TranslationNote } from './Note';

const meta: Meta<typeof TranslationNote> = {
    title: 'Text/Translation/Note',
    component: TranslationNote,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: { activateNote: fn() },
    decorators: (Story) => (
        <Box sx={{ padding: '10px', width: '600px' }}>
            <Story />
        </Box>
    ),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {
        ...buildFakeNote(),
        onUpdate: action('inactiveNote'),
        deleteNote: action('deleteNote'),
        activated: false,
        activateNote: action('activateNote'),
        deactivateNote: action('deactivateNote'),
    },
};

export const Active: Story = {
    args: {
        ...buildFakeNote(),
        onUpdate: action('activatedNote'),
        deleteNote: action('deleteNote'),
        activated: true,
        activateNote: action('activateNote'),
        deactivateNote: action('deactivateNote'),
    },
};
