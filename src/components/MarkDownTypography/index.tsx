import { Box, Typography, TypographyProps } from '@mui/material';

import { MarkdownSection, parseMarkdown } from './parseMarkdown';

/**
 * Recursive function to render markdown sections.
 */
const Section = ({ section }: { section: MarkdownSection }) => (
    <Box
        sx={{
            marginTop: '10px',
            marginLeft: '10px',
            borderLeft: '1px solid #ccc',
            borderRadius: '5px',
            paddingLeft: '5px',
            backgroundColor: '#fafafa',
            // Highlight when hovered, animate
            '&:hover': {
                backgroundColor: '#fff',
                borderLeft: '1px solid #5f5e5e',
                transition:
                    'background-color 0.3s ease-in-out, border-left 1s ease-in-out',
            },
        }}
    >
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
                <Box
                    sx={{
                        marginTop: '10px',
                        backgroundColor: '#fafafa',
                        // Highlight when hovered, animate
                        '&:hover': {
                            backgroundColor: '#fff',
                            transition: 'background-color 0.3s ease-in-out',
                        },
                    }}
                >
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
            variant = 'h5';
            break;
        case 3:
            variant = 'h6';
            break;
        case 4:
            variant = 'subtitle1';
            break;
        default:
            variant = 'body2';
    }
    return variant;
}
