import { faker } from '@faker-js/faker';
import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';
import { buildFakeContent, buildFakeHeader } from 'components';
import { getNoteId } from 'helpers';

import { OriginalChart } from './Chart';

const meta: Meta<typeof OriginalChart> = {
    title: 'Text/Original/Chart',
    component: OriginalChart,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic = ((): Story => {
    const notes = Array(3)
        .fill(null)
        .map(() => ({
            header: buildFakeHeader(),
            content: buildFakeContent(2),
        }));

    const activatedNoteId = getNoteId(
        notes[faker.number.int(notes.length - 1)]
    );

    return {
        args: {
            notes,
            activatedNoteId,
            activateNote: action('activateNote'),
        },
    };
})();

export const Long = ((): Story => {
    const notes = Array(30)
        .fill(null)
        .map(() => ({
            header: buildFakeHeader(),
            content: buildFakeContent(),
        }));

    const activatedNoteId = getNoteId(notes[faker.number.int(5)]);

    return {
        args: {
            notes,
            activatedNoteId,
            activateNote: action('activateNote'),
        },
    };
})();
