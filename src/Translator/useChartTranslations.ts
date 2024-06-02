// useChartTranslations.ts
import { chartsActions, User } from 'features';
import { getNoteId } from 'helpers';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Note } from 'validators';

interface UseChartTranslationsParams {
    originalChartId: string | undefined;
    chartId: string | undefined;
    translatedRawNotes: Note[];
    user: User | null;
}

interface InsertNoteArgs {
    noteId: string;
    position: 'before' | 'after';
    type: string;
    author: string;
}

export function useChartTranslations({
    originalChartId,
    chartId,
    translatedRawNotes,
    user,
}: UseChartTranslationsParams) {
    const dispatch = useDispatch();

    const updateNote = useCallback(
        ({
            noteId,
            content,
            type,
        }: {
            noteId: string;
            content: string | undefined;
            type: string | undefined;
        }) => {
            if (!chartId) return;
            const note = translatedRawNotes.find(
                (n) => getNoteId(n) === noteId
            );
            if (!note || (!type && !content)) return;

            dispatch(
                chartsActions.updateChart({
                    note: {
                        ...note,
                        type: type ?? note.type,
                        content: content ?? note.content,
                    },
                    id: chartId,
                })
            );
        },
        [chartId, dispatch, translatedRawNotes]
    );

    const insertNote = useCallback(
        ({ noteId, position, type, author }: InsertNoteArgs) => {
            if (!chartId) return;
            dispatch(
                chartsActions.insertNote({
                    chartId,
                    noteId,
                    position,
                    type,
                    author,
                })
            );
        },
        [chartId, dispatch]
    );

    const deleteNote = useCallback(
        (noteId: string) => {
            if (!chartId || !user) return;
            dispatch(
                chartsActions.deleteChartNote({
                    chartId,
                    noteId,
                    user,
                })
            );
        },
        [chartId, dispatch, user]
    );

    const reInsertDeletedNote = useCallback(
        (noteId: string) => {
            if (!chartId || !originalChartId) return;
            dispatch(
                chartsActions.reInsertDeletedNote({
                    sourceChartId: originalChartId,
                    targetChartId: chartId,
                    noteId,
                })
            );
        },
        [chartId, dispatch, originalChartId]
    );

    return { updateNote, insertNote, deleteNote, reInsertDeletedNote };
}
