import {
    Box,
    SxProps,
    Theme,
    Typography,
    TypographyProps,
} from '@mui/material';

import { MarkdownSection, parseMarkdown } from './parseMarkdown';

const boxStyles: SxProps<Theme> = {
    marginTop: '10px',
    marginLeft: '10px',
    borderLeft: '2px solid',
    borderColor: '#00000005', // Default border color
    borderRadius: '5px',
    paddingLeft: '5px',
    backgroundColor: '#fafafa',
    '&:hover': {
        backgroundColor: '#fff',
        borderColor: '#00000088', // Hover border color
    },
    transition:
        'background-color 0.5s ease-in-out, border-left 0.5s ease-in-out',
};

/**
 * Recursive function to render markdown sections.
 */
const Section = ({ section }: { section: MarkdownSection }) => (
    <Box sx={{ ...boxStyles }}>
        <Typography
            variant={getTypographyVariant(section.level)}
            sx={{ textAlign: 'left' }}
        >
            {section.header.replace(/^#+\s*/, '')}
        </Typography>
        {section.content.map((line, index) =>
            line.trim() === '' ? (
                <br key={index} />
            ) : (
                <Typography
                    key={index}
                    variant="body1"
                    sx={{ textAlign: 'left' }}
                >
                    {line}
                </Typography>
            )
        )}
        {section.sections.map((subSection, subKey) => (
            <Section section={subSection} key={subKey} />
        ))}
    </Box>
);

/**
 * Simple converter from markdown to Typography components for headers.
 */
export const MarkdownTypography = ({ content }: { content: string }) => {
    const { baseContent, sections } = parseMarkdown(content);

    return (
        <>
            {baseContent.length > 0 && (
                <Box sx={{ ...boxStyles }}>
                    {baseContent.map((line, index) =>
                        line.trim() === '' ? (
                            <br key={index} />
                        ) : (
                            <Typography
                                key={index}
                                variant="body1"
                                sx={{ textAlign: 'left', marginBottom: '10px' }}
                            >
                                {line}
                            </Typography>
                        )
                    )}
                </Box>
            )}
            {sections.map((section, index) => (
                <Section section={section} key={index} />
            ))}
        </>
    );
};

function getTypographyVariant(level: number) {
    let variant: TypographyProps['variant'];

    switch (level) {
        case 2:
            variant = 'h6';
            break;
        case 3:
            variant = 'subtitle2';
            break;
        case 4:
            variant = 'subtitle1';
            break;
        default:
            variant = 'body2';
    }
    return variant;
}
