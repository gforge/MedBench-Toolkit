import { Paper } from '@mui/material';
import { Meta, StoryObj } from '@storybook/react';

import { ReviewStart } from './ReviewStart';

const meta: Meta<typeof ReviewStart> = {
    title: 'Text/ReviewStart',
    component: ReviewStart,
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

const specialties = ['Cardiology', 'Orthopaedics', 'Gastroenterology'];
const languages = ['English', 'Swedish', 'Spanish', 'French'];

export const Basic: Story = {
    args: {
        specialties: specialties.reduce(
            (acc, specialty) => {
                acc[specialty] = languages;
                return acc;
            },
            {} as Record<string, string[]>
        ),
    },
};
