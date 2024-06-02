import dayjs, { Dayjs } from 'dayjs';
import { Note } from 'validators';

export const getNoteDate = ({
    date,
    time,
}: Pick<Note, 'date' | 'time'>): Dayjs => {
    return dayjs(`${date} ${time}`, 'YYYY-MM-DD HH:mm');
};
