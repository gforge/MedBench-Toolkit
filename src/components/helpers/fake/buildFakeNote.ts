import { buildFakeNoteContent } from './buildFakeContent';
import { buildFakeNoteHeader } from './buildFakeHeader';

type FakeNote = {
    header?: Partial<Header>;
    content?: string | number;
};

export const buildFakeNote = (args: FakeNote = {}): Note => {
    const header = buildFakeNoteHeader(args.header);
    const content =
        typeof args.content === 'number' || args.content === undefined
            ? buildFakeNoteContent(args.content)
            : args.content;
    return { header, content };
};
