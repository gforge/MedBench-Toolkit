import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

import { TextareaAutosize } from '@mui/material';
import MDEditor, { commands } from '@uiw/react-md-editor/nohighlight';
import { MarkdownTypography } from 'components';
import { selectSettings } from 'features';
import { useSelector } from 'react-redux';

interface NoteEditorProps extends Pick<Note, 'content'> {
    activated: boolean;
    onUpdate: (args: {
        content: string | undefined;
        type: string | undefined;
    }) => void;
}

export const NoteEditor = ({
    content,
    activated,
    onUpdate,
}: NoteEditorProps) => {
    const { texteditor: typeOfEditor } = useSelector(selectSettings);
    if (!activated) return <MarkdownTypography content={content} />;

    if (typeOfEditor === 'react-md-editor') {
        return (
            <MDEditor
                value={content}
                onChange={(content) => onUpdate({ content, type: undefined })}
                commands={[
                    commands.group([commands.title2, commands.title3], {
                        name: 'title',
                        groupName: 'title',
                        buttonProps: { 'aria-label': 'Insert title' },
                    }),
                    commands.bold,
                    commands.italic,
                    commands.divider,
                    commands.help,
                ]}
            />
        );
    }

    return (
        <TextareaAutosize
            aria-label="minimum height"
            minRows={3}
            placeholder="The content of the note"
            value={content}
            onChange={(e) =>
                onUpdate({ content: e.target.value, type: undefined })
            }
            style={{
                width: '100%',
                border: '1px solid #ccc',
                borderRadius: '4px',
                padding: '4px',
            }}
        />
    );
};
