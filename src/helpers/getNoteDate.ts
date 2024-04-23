import dayjs, { Dayjs } from 'dayjs';

export const getNoteDate = ({ header: { date, time } }: Note): Dayjs => {
    return dayjs(`${date} ${time}`, 'YYYY-MM-DD HH:mm');
};
