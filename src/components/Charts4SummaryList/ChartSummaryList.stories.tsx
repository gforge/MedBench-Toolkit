import { faker } from '@faker-js/faker';
import { Paper } from '@mui/material';
import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';
import { buildFakeNote } from 'components';
import dayjs from 'dayjs';
import { type Chart, chartValidator } from 'validators';

import { exampleLabValues } from '../LabValues/exampleData';
import { exampleMedications } from '../Medications/exampeData';
import { Chart4SummaryList } from './ChartList';

const meta: Meta<typeof Chart4SummaryList> = {
    title: 'Text/ChartSummaryList',
    component: Chart4SummaryList,
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

const today = dayjs();
const buildFakeChart = (name: string, specialty: string): Chart =>
    chartValidator.validateSync({
        name,
        specialty,
        language: 'original',
        notes: Array(5)
            .fill({})
            .map(
                (_, i) =>
                    buildFakeNote({
                        header: {
                            date: today.add(i, 'day').toDate(),
                        },
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    }) as any
            ),
        medications: exampleMedications,
        lab: exampleLabValues,
    });

const specialties = ['Cardiology', 'Orthopaedics', 'Gastroenterology'];

export const Basic: Story = {
    args: {
        charts: Array(5)
            .fill(null)
            .map((_, i) =>
                buildFakeChart(
                    `Chart ${i}`,
                    specialties[faker.number.int(specialties.length - 1)]
                )
            ),
        summarise: action('translate'),
    },
};
