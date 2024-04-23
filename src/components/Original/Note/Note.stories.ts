import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { buildFakeContent, buildFakeHeader } from 'components';

import { OriginalNote } from './OriginalNote';

const meta: Meta<typeof OriginalNote> = {
    title: 'Text/Original/Note',
    component: OriginalNote,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: { activateNote: fn() },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {
        header: buildFakeHeader(),
        content: buildFakeContent(),
        activated: false,
    },
};

export const Active: Story = {
    args: {
        header: buildFakeHeader(),
        content: buildFakeContent(),
        activated: true,
    },
};
