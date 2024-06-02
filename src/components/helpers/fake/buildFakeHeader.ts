import { faker } from '@faker-js/faker';
import { getNoteId } from 'helpers';
import { Note } from 'validators';

export type FakeHeaderArgs = Partial<
    Omit<Note, 'time' | 'date' | 'content'>
> & {
    date?: Date | string;
};

export const buildFakeNoteHeader = (
    args: FakeHeaderArgs = {}
): Omit<Note, 'content'> => {
    const d =
        args.date instanceof Date
            ? args.date.toISOString()
            : args.date ?? faker.date.recent({ days: 10 }).toISOString();
    const headerBase = {
        type: args.type ?? faker.lorem.sentence(2).slice(0, -1),
        date: d.slice(0, 10),
        time: d.slice(11, 16),
        author: args.author ?? faker.person.fullName(),
    };

    return {
        id: args.id ?? getNoteId(headerBase),
        ...headerBase,
    };
};
