import { useEffect } from 'react';

export const useScrollToActiveNote = ({
    activatedNoteId,
    prefix,
}: {
    activatedNoteId?: string;
    prefix: string;
}) => {
    useEffect(() => {
        if (!activatedNoteId) return;
        // Scroll to the activated note
        const activatedNote = document.getElementById(prefix + activatedNoteId);
        if (!activatedNote) {
            return;
        }
        // Skip scroll if entire note is visible
        const rect = activatedNote.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
            return;
        }

        activatedNote.scrollIntoView({ behavior: 'smooth' });
    }, [activatedNoteId, prefix]);
};
