import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

import { TextareaAutosize } from '@mui/material';
import { CustomMDEditor, MarkdownTypography } from 'components';
import { selectSettings } from 'features';
import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import type { Note } from 'validators';

interface NoteEditorProps extends Pick<Note, 'content'> {
    activated: boolean;
    onUpdate: (args: {
        content: string | undefined;
        type: string | undefined;
    }) => void;
}

// For historical reasons, the single # is the header
// and the double ## are used in the content
// This function is used to strip the first # from the content
const stripFirstHashtag = (content: string): string => {
    if (!content) return '';

    const hasH1 = content.startsWith('# ');
    console.log(hasH1, content, content.replaceAll(/(^|\n)#(#+) /g, '$1 '));
    if (hasH1) {
        return content;
    }
    return content.replaceAll(/^#(#+) /g, '$1 ');
};

const useUpdater = ({
    content,
    onUpdate,
}: Pick<NoteEditorProps, 'onUpdate' | 'content'>) => {
    const [fixedContent, setFixedContent] = useState(
        stripFirstHashtag(content)
    );

    const updateFixedContent = useCallback(
        (newContent?: string) => {
            setFixedContent(newContent ?? '');

            onUpdate({ content: newContent, type: undefined });
        },
        [onUpdate]
    );

    return { fixedContent, updateFixedContent };
};

export const NoteEditor = ({
    content,
    activated,
    onUpdate,
}: NoteEditorProps) => {
    const { texteditor: typeOfEditor } = useSelector(selectSettings);
    const { fixedContent, updateFixedContent } = useUpdater({
        content,
        onUpdate,
    });
    if (!activated) return <MarkdownTypography content={content} />;

    if (typeOfEditor === 'react-md-editor') {
        return (
            <CustomMDEditor
                value={fixedContent}
                onChange={updateFixedContent}
            />
        );
    }

    return (
        <TextareaAutosize
            aria-label="minimum height"
            minRows={3}
            placeholder="The content of the note"
            value={fixedContent}
            onChange={(e) => updateFixedContent(e.target.value)}
            style={{
                width: '100%',
                border: '1px solid #ccc',
                borderRadius: '4px',
                padding: '4px',
            }}
        />
    );
};
