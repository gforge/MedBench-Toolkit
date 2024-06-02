import { faker } from '@faker-js/faker';
import { Paper } from '@mui/material';
import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';
import { type Chart, chartValidator } from 'validators';

import { buildFakeNote } from '../helpers';
import { TranslationNoteList } from './NoteList';

const meta: Meta<typeof TranslationNoteList> = {
    title: 'Text/TranslationNoteList',
    component: TranslationNoteList,
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

const buildFakeChart = (
    name: string,
    specialty: string,
    language: string
): Chart =>
    chartValidator.validateSync({
        name,
        specialty,
        language,
        notes: Array(5).fill({}).map(buildFakeNote),
    });

const specialties = ['Cardiology', 'Orthopaedics', 'Gastroenterology'];

export const Basic: Story = {
    args: {
        charts: Array(5)
            .fill(null)
            .map((_, i) =>
                buildFakeChart(
                    `Chart ${i}`,
                    specialties[faker.number.int(specialties.length - 1)],
                    'original'
                )
            ),
        translate: action('translate'),
        deleteChart: action('deleteChart'),
    },
};
