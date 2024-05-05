import { FileDownload } from '@mui/icons-material';
import { Button, Tooltip } from '@mui/material';
import { selectSummaryChart } from 'features';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

export function ExportSummary() {
    const { id } = useParams<{ id: string }>();
    const chart4summary = useSelector((state) => selectSummaryChart(state, id));
    const export2file = useCallback(() => {
        if (!chart4summary) {
            return;
        }
        const { summary } = chart4summary;
        const blob = new Blob([summary], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Summary_4_${id}.md`;
        a.click();
        URL.revokeObjectURL(url);
    }, [chart4summary, id]);

    const navigate = useNavigate();
    if (!chart4summary) {
        navigate('/summarise');
        return null;
    }

    const { summary } = chart4summary;

    return (
        <Tooltip title="Export to markdown text file">
            <Button
                startIcon={<FileDownload />}
                disabled={!summary?.length}
                onClick={export2file}
                variant="contained"
                size="small"
            >
                Export
            </Button>
        </Tooltip>
    );
}
