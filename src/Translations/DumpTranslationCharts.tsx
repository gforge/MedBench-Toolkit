import { Button } from '@mui/base';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import { selectCharts } from '../features';

export const DumpTranslationCharts = () => {
    const charts = useSelector(selectCharts);
    const download = useCallback(() => {
        const a = document.createElement('a');
        const file = new Blob([JSON.stringify(charts)], {
            type: 'application/json',
        });
        a.href = URL.createObjectURL(file);
        a.download = 'medbench_cahrt_download.mbc';
        a.click();
    }, [charts]);

    if (charts.length === 0) {
        return null;
    }

    return <Button onClick={download}>Download charts</Button>;
};
