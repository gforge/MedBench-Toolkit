declare interface Chart {
    name: string;
    specialty: string;
    originalNotes: Note[];
    // Translations are stored in a Record where the key is the language code
    translations: Record<string, Note[]>;
}
