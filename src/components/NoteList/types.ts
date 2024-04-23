export type TranslateFn = (args: { id: string; language: string }) => unknown;
export type UploadTranslationFn = (args: {
    id: string;
    language: string;
    translation: Note[];
}) => unknown;
export type DeleteFn = (args: { id: string; language?: string }) => unknown;

export interface NoteListRowProps {
    chart: Chart;
    translate: TranslateFn;
    uploadTranslation: UploadTranslationFn;
    deleteChart: DeleteFn;
    setActive: (chart: Chart) => void;
    setChartName: (args: { id: string; name: string }) => void;
    setChartSpecialty: (args: { id: string; specialty: string }) => void;
}

export interface NoteListProps
    extends Pick<
        NoteListRowProps,
        | 'translate'
        | 'deleteChart'
        | 'uploadTranslation'
        | 'setChartName'
        | 'setChartSpecialty'
    > {
    charts: Chart[];
}
