import { TranslationNoteProps } from './Note';

export type InsertNoteFn = (args: {
    noteId: string;
    position: 'before' | 'after';
    type: string;
    author: string;
}) => void;

export interface TranslationChartProps {
    notes: Omit<
        TranslationNoteProps,
        | 'activated'
        | 'id'
        | 'deactivateNote'
        | 'activateNote'
        | 'onUpdate'
        | 'deleteNote'
        | 'existingTypes'
    >[];
    activatedNoteId?: string;
    activateNote: (noteId?: string) => void;
    updateNote: (args: {
        noteId: string;
        content: string | undefined;
        type: string | undefined;
    }) => void;
    insertNote: InsertNoteFn;
    deleteNote: (noteId: string) => void;
}
