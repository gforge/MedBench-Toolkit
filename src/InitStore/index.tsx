import { Button } from '@mui/base';
import { FileUpload } from '@mui/icons-material';
import { Stack } from '@mui/material';
import { chartsActions, selectCharts } from 'features';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { InitAlert } from './InitAlert';
import { useLoadStoreDropzone } from './useLoadStoreDropzone';

export const InitStore = () => {
    const charts = useSelector(selectCharts);
    const [error, setError] = useState<string | null>(null);
    const dispatch = useDispatch();
    const initStore = useCallback(
        (args: { charts: Chart[] }) => {
            dispatch(chartsActions.initStore(args));
        },
        [dispatch]
    );

    const { getRootProps, getInputProps, open, isFileDialogActive } =
        useLoadStoreDropzone({ setError, initStore });
    if (charts.length > 0) {
        return null;
    }

    return (
        <>
            <input {...getInputProps()} />

            <Button
                {...getRootProps({ className: 'dropzone' })}
                color="primary"
                onClick={open}
                disabled={isFileDialogActive}
            >
                <Stack direction="row" alignItems="center" gap={1}>
                    <FileUpload />
                    Initiate cases from .mbc file
                </Stack>
            </Button>
            <InitAlert error={error} setError={setError} />
        </>
    );
};
