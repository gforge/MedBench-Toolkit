/**
 * Note header
 */
declare type Header = {
    /** A string that is unique to this header */
    id: string;
    /**
     * Type of the note, e.g. "Surgery note", "Daily progress note"
     */
    type: string;
    /**
     * Date of the note in the format of YYYY-MM-DD
     * @example 2021-12-31
     */
    date: string;
    /**
     * Time of the note in the format of HH:MM
     */
    time: string;
    /**
     * Author of the note, e.g. "Dr. John Doe", "Nurse Jane Doe"
     */
    author: string;
};

/**
 * Note with header and content
 */
declare type Note = {
    /**
     * Note header that is unique to the note
     */
    header: Header;
    content: string;
};
