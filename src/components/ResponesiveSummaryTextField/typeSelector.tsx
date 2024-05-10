import { RootState } from 'store';

import { BasicTextField } from './basic';
import { MarkdownSummaryTextField } from './markdown';

/**
 * Renders a text field based on the type of editor specified.
 *
 * @param onChange - Callback function invoked when the text field value changes.
 * @param value - The current value of the text field.
 * @param placeholder - The placeholder text for the text field.
 * @param containerRef - Reference to the container element of the text field.
 * @param typeOfEditor - The type of editor to use for rendering the text field.
 * @returns The rendered text field component.
 * @throws Error if an invalid editor type is provided.
 */
export const TextFieldTypeSelector = ({
    onChange,
    value,
    placeholder,
    typeOfEditor,
    containerRef,
}: {
    onChange: (text?: string) => void;
    value: string;
    placeholder: string;
    containerRef: React.RefObject<HTMLDivElement>;
    typeOfEditor: RootState['settings']['texteditor'];
}) => {
    if (typeOfEditor === 'basic') {
        return (
            <BasicTextField
                onChange={onChange}
                value={value}
                placeholder={placeholder}
                containerRef={containerRef}
            />
        );
    }

    if (typeOfEditor === 'react-md-editor') {
        return (
            <MarkdownSummaryTextField
                onChange={onChange}
                value={value}
                placeholder={placeholder}
                containerRef={containerRef}
            />
        );
    }

    throw new Error(`Invalid editor type: ${typeOfEditor}`);
};
