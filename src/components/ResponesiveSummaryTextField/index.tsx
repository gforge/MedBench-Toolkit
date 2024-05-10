import { useRef } from 'react';
import { RootState } from 'store';

import { TextFieldTypeSelector } from './typeSelector';

export const ResponsiveSummaryTextField = ({
    onChange,
    value,
    placeholder,
    typeOfEditor,
}: {
    onChange: (text?: string) => void;
    value: string;
    placeholder: string;
    typeOfEditor: RootState['settings']['texteditor'];
}) => {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <div
            ref={containerRef}
            style={{
                height: '100%',
                width: typeOfEditor === 'basic' ? '100%' : '900px',
            }}
        >
            <TextFieldTypeSelector
                onChange={onChange}
                value={value}
                placeholder={placeholder}
                containerRef={containerRef}
                typeOfEditor={typeOfEditor}
            />
        </div>
    );
};
