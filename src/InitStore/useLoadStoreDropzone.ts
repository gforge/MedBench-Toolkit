import { useDropzone } from 'react-dropzone';
import type { Chart } from 'validators';
import { chartValidator } from 'validators';

export const useLoadStoreDropzone = ({
    setError,
    initStore,
}: {
    setError: (s: string | null) => void;
    initStore: (args: { charts: Chart[] }) => void;
}) => {
    return useDropzone({
        noClick: true,
        noKeyboard: true,
        accept: {
            'text/JSON': ['.mbc'],
        },
        maxFiles: 1,
        onDrop(acceptedFiles) {
            const file = acceptedFiles[0];
            const reader = new FileReader();
            reader.onload = async () => {
                try {
                    const raw = JSON.parse(reader.result as string);
                    if (!Array.isArray(raw)) {
                        throw new Error('Invalid file format');
                    }
                    const charts = raw.map((c) =>
                        chartValidator.validateSync(c)
                    );

                    initStore({ charts });
                    setError(null);
                } catch (error: unknown) {
                    setError(
                        error instanceof Error
                            ? error.message
                            : `Unknown error: ${error}`
                    );
                }
            };
            reader.readAsText(file);
        },
    });
};
