import { action } from '@storybook/addon-actions';
import { Meta } from '@storybook/react';
import { buildFakeContent, buildFakeHeader } from 'components';
import { useMemo } from 'react';

import { BaseGrid } from './BaseGrid';

const BaseGridWrapper = ({
    noNotes,
    ...args
}: Omit<
    Parameters<typeof BaseGrid>,
    'notes' | 'originalNotes' | 'translatedNotes'
> & { noNotes: number }) => {
    const { notes } = useMemo(() => {
        const notes = Array(noNotes)
            .fill(null)
            .map(() => ({
                header: buildFakeHeader(),
                content: buildFakeContent(),
            }));

        return { notes };
    }, [noNotes]);

    const originalNotes = {
        notes,
        language: 'original',
    };

    const translatedNotes = {
        notes,
        language: 'Swedish',
        updateNote: (args: unknown) => {
            console.log(args);

            action('updateNote')(args);
        },
        insertNote: (args: unknown) => {
            console.log(args);

            action('insertNote')(args);
        },
        deleteNote: (args: unknown) => {
            console.log(args);

            action('deleteNote')(args);
        },
    };

    return (
        <BaseGrid
            {...args}
            originalNotes={originalNotes}
            translatedNotes={translatedNotes}
        />
    );
};

const meta: Meta<typeof BaseGridWrapper> = {
    title: 'Text/BaseGrid',
    component: BaseGridWrapper,
    decorators: (Story) => (
        <div
            style={{
                width: '1200px',
                height: '100%',
                border: '1px solid red',
                padding: '10px',
            }}
        >
            <Story />
        </div>
    ),
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;

export const Short = {
    args: {
        noNotes: 3,
    },
};

export const Long = {
    args: {
        noNotes: 30,
    },
};
