import { Typography, TypographyProps } from '@mui/material';
import { RatingSection, RatingSectionProps } from 'components';

interface RatingSectionGroupProps {
    title: TypographyProps['children'];
    ratings: RatingSectionProps[];
}

export const RatingSectionGroup = ({
    title,
    ratings,
}: RatingSectionGroupProps) => {
    return (
        <>
            <Typography variant="h6" gutterBottom>
                {title}
            </Typography>
            {ratings.map((rating) => (
                <RatingSection key={rating.name} {...rating} />
            ))}
        </>
    );
};
