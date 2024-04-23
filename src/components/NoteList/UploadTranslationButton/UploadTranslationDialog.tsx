import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Stack,
    TextField,
} from '@mui/material';
import { OriginalNote } from 'components';
import { getChartId, getNoteId } from 'helpers';

import { UploadTranslationFn } from '../types';

export const UploadTranslationDialog = ({
    chart,
    translation,
    language,
    setTranslation,
    setLanguage,
    upload,
}: {
    chart: Chart;
    translation: Note[];
    language: string;
    setLanguage: (s: string) => void;
    setTranslation: (n: Note[]) => void;
    upload: UploadTranslationFn;
}) => {
    return (
        <Dialog
            open={translation.length > 0}
            onClose={() => setTranslation([])}
        >
            <DialogTitle>Upload translation of chart</DialogTitle>
            <DialogContent>
                <Stack direction={'column'} gap={1} sx={{ padding: '1em' }}>
                    <TextField
                        label="Language"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        onClick={() => {
                            upload({
                                id: getChartId(chart),
                                language,
                                translation,
                            });
                            setTranslation([]);
                        }}
                    >
                        Upload
                    </Button>
                </Stack>
                <Box
                    sx={{
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                        padding: '1em',
                    }}
                >
                    {translation.map((n) => (
                        <OriginalNote
                            key={getNoteId(n)}
                            id={getNoteId(n)}
                            content={n.content}
                            header={n.header}
                            hideActions
                        />
                    ))}
                </Box>
            </DialogContent>
        </Dialog>
    );
};
