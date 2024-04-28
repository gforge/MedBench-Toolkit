import { FileUpload } from '@mui/icons-material';
import { Button, Stack } from '@mui/material';
import { useState } from 'react';

import { UploadTranslationFn } from '../types';
import { UploadAlert } from './UploadAlert';
import { UploadTranslationDialog } from './UploadTranslationDialog';
import { useTranslationDropzone } from './useTranslationDropzone';

/**
 * Accept md text file with translation. If the file is not in the correct format, the user will be notified.
 * The user will be prompted for the language of the translation in a dialog.
 * The user can either open a file selector dialog or drag and drop the file.
 * The translation language is in the file name, e.g. `Some_chart_name_translation.md`.
 *
 * @param param0 Args for the UploadTranslationButton component
 */
export const UploadTranslationButton = ({
    chart,
    upload,
}: {
    chart: Chart;
    upload: UploadTranslationFn;
}) => {
    const [language, setLanguage] = useState('');
    const [translation, setTranslation] = useState<Note[]>([]);
    const [error, setError] = useState<string | null>(null);

    const { getRootProps, getInputProps, open, isFileDialogActive } =
        useTranslationDropzone({ setError, setTranslation, setLanguage });

    return (
        <div {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />

            <Button
                variant="outlined"
                color="secondary"
                aria-haspopup="true"
                onClick={open}
                disabled={isFileDialogActive}
            >
                <Stack direction="row" alignItems="center" gap={1}>
                    <FileUpload />
                    Upload
                </Stack>
            </Button>
            <UploadTranslationDialog
                chart={chart}
                language={language}
                setLanguage={setLanguage}
                translation={translation}
                setTranslation={setTranslation}
                upload={upload}
            />
            <UploadAlert error={error} setError={setError} />
        </div>
    );
};
