import { Typography, TypographyProps } from '@mui/material';

/**
 * Simple converter from markdown to Typography components for headers
 */
export const MarkdownTypography = ({ content }: { content: string }) => (
    <>
        {content
            .split('\n')
            .map((line) => line.trim())
            .map((line, index) => {
                let variant: TypographyProps['variant'] = 'body2';
                let marginLeft = '0px';
                if (line.startsWith('## ')) {
                    variant = 'h6';
                    marginLeft = '8px';
                } else if (line.startsWith('### ')) {
                    variant = 'subtitle1';
                    marginLeft = '16px';
                } else if (line.startsWith('#### ')) {
                    variant = 'subtitle2';
                    marginLeft = '24px';
                }
                if (line === '') {
                    return <br key={index} />;
                }

                return (
                    <Typography
                        variant={variant}
                        key={index}
                        sx={{ marginLeft, textAlign: 'left' }}
                    >
                        {line}
                    </Typography>
                );
            })}
    </>
);
