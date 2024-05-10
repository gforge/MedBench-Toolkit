import { styled } from '@mui/material';
import MDEditor, { commands } from '@uiw/react-md-editor';
import { useEffect, useState } from 'react';

const StyledMDEditor = styled(MDEditor)({
    '& .wmde-markdown': {
        '& h1': { fontSize: '1.25rem' },
        '& h2': { fontSize: '1.1rem', marginLeft: '10px' },
        '& h3': { fontSize: '1.0rem', marginLeft: '20px' },
        '& h4': { fontSize: '0.85rem', marginLeft: '20px' },
        '& h5': { fontSize: '0.75rem', marginLeft: '20px' },
        '& h6': { fontSize: '0.75rem', marginLeft: '20px' },
    },
});

export const MarkdownSummaryTextField = ({
    onChange,
    value,
    placeholder,
    containerRef,
}: {
    onChange: (text?: string) => void;
    value: string;
    placeholder: string;
    containerRef: React.RefObject<HTMLDivElement>;
}) => {
    const [editorHeight, setEditorHeight] = useState('100px');

    useEffect(() => {
        const updateEditorHeight = () => {
            if (containerRef.current) {
                const padding = 16; // Adjust padding as needed
                const availableHeight =
                    containerRef.current.clientHeight - padding;
                setEditorHeight(`${availableHeight}px`);
            }
        };

        updateEditorHeight(); // Call once on mount to set initial size

        // Set up a ResizeObserver to adjust editor height on resize
        const resizeObserver = new ResizeObserver(updateEditorHeight);
        const currentContainerRef = containerRef.current;
        if (currentContainerRef) {
            resizeObserver.observe(currentContainerRef);
        }

        return () => {
            if (currentContainerRef) {
                resizeObserver.unobserve(currentContainerRef);
            }
        };
    }, [containerRef]);

    return (
        <StyledMDEditor
            value={value}
            onChange={onChange}
            textareaProps={{ placeholder }}
            height={editorHeight}
            visibleDragbar={false}
            commands={[
                commands.group(
                    [commands.title1, commands.title2, commands.title3],
                    {
                        name: 'title',
                        groupName: 'title',
                        buttonProps: { 'aria-label': 'Insert title' },
                    }
                ),
                commands.bold,
                commands.italic,
                commands.divider,
                commands.help,
            ]}
        />
    );
};
