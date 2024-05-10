import { styled } from '@mui/material';
import MDEditor, {
    commands,
    MDEditorProps,
} from '@uiw/react-md-editor/nohighlight';

const StyledMDEditor = styled(MDEditor)({
    '& .wmde-markdown': {
        '& h1': {
            fontSize: '1.25rem',
            marginBottom: '4px',
        },
        '& h2': {
            fontSize: '1.1rem',
            marginLeft: '10px',
            marginBottom: '4px',
        },
        '& h3': {
            fontSize: '1.0rem',
            marginLeft: '20px',
            marginBottom: '4px',
        },
        '& h4': {
            fontSize: '0.85rem',
            marginLeft: '20px',
            marginBottom: '4px',
        },
        '& h5': {
            fontSize: '0.75rem',
            marginLeft: '20px',
            marginBottom: '4px',
        },
        '& h6': {
            fontSize: '0.75rem',
            marginLeft: '20px',
            marginBottom: '4px',
        },
    },
});

export const CustomMDEditor = (args: MDEditorProps) => (
    <StyledMDEditor
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
        {...args}
    />
);
