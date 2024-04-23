import { faker } from '@faker-js/faker';
import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { buildFakeHeader } from 'components';
import { getNoteId } from 'helpers';

import { TranslationChart } from './Chart';

const meta: Meta<typeof TranslationChart> = {
    title: 'Text/Translation/Chart',
    component: TranslationChart,
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
            content: faker.lorem.paragraph(),
        }));

    const activatedNoteId = getNoteId(
        notes[faker.number.int(notes.length - 1)]
    );

    return {
        args: {
            notes,
            activatedNoteId,
            activateNote: action('activateNote'),
            updateNote: action('updateNote'),
            deleteNote: action('deleteNote'),
        },
    };
})();

export const Long = ((): Story => {
    const notes = Array(30)
        .fill(null)
        .map(() => ({
            header: buildFakeHeader(),
            content: faker.lorem.paragraph(),
        }));

    const activatedNoteId = getNoteId(notes[faker.number.int(5)]);

    return {
        args: {
            notes,
            activatedNoteId,
            activateNote: fn(console.log),
        },
    };
})();
