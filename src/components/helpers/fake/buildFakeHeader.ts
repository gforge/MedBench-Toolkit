import { faker } from '@faker-js/faker';
import { getNoteId } from 'helpers';

export type FakeHeaderArgs = Partial<Omit<Header, 'time' | 'date'>> & {
    date?: Date | string;
};

export const buildFakeNoteHeader = (args: FakeHeaderArgs = {}): Header => {
    const d =
        args.date instanceof Date
            ? args.date.toISOString()
            : args.date ?? faker.date.recent({ days: 10 }).toISOString();
    const headerBase: Omit<Header, 'id'> = {
        type: args.type ?? faker.lorem.sentence(2).slice(0, -1),
        date: d.slice(0, 10),
        time: d.slice(11, 16),
        author: args.author ?? faker.person.fullName(),
    };

    return {
        id: args.id ?? getNoteId({ header: headerBase }),
        ...headerBase,
    };
};
