// useChartTranslations.ts
import { charts2translateActions } from 'features';
import { getNoteId } from 'helpers';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

interface UseChartTranslationsParams {
    chartId: string | undefined;
    chart: Chart | null;
    language: string | undefined;
    translatedRawNotes: Note[];
}

interface InsertNoteArgs {
    noteId: string;
    position: 'before' | 'after';
    type: string;
    author: string;
}

export function useChartTranslations({
    chartId,
    chart,
    language,
    translatedRawNotes,
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
            if (!chartId || !chart || !language) return;
            const note = translatedRawNotes.find(
                (n) => getNoteId(n) === noteId
            );
            if (!note || (!type && !content)) return;

            dispatch(
                charts2translateActions.updateChart({
                    note: {
                        ...note,
                        header: {
                            ...note.header,
                            type: type ?? note.header.type,
                        },
                        content: content ?? note.content,
                    },
                    id: chartId,
                    language,
                })
            );
        },
        [chart, chartId, dispatch, language, translatedRawNotes]
    );

    const insertNote = useCallback(
        ({ noteId, position, type, author }: InsertNoteArgs) => {
            if (!chartId || !chart || !language) return;
            dispatch(
                charts2translateActions.insertNote({
                    chartId,
                    noteId,
                    language,
                    position,
                    type,
                    author,
                })
            );
        },
        [chart, chartId, dispatch, language]
    );

    const deleteNote = useCallback(
        (noteId: string) => {
            if (!chartId || !chart || !language) return;
            dispatch(
                charts2translateActions.deleteChartNote({
                    chartId,
                    noteId,
                    language,
                })
            );
        },
        [chart, chartId, dispatch, language]
    );

    const reInsertDeletedNote = useCallback(
        (noteId: string) => {
            if (!chartId || !chart || !language) return;
            dispatch(
                charts2translateActions.reInsertDeletedNote({
                    chartId,
                    noteId,
                    language,
                })
            );
        },
        [chart, chartId, dispatch, language]
    );

    return { updateNote, insertNote, deleteNote, reInsertDeletedNote };
}
