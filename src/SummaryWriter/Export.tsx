import { FileDownload } from '@mui/icons-material';
import { Button, Tooltip } from '@mui/material';
import { useSummary } from 'features';
import { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export function ExportSummary({ summaryId }: { readonly summaryId: string }) {
    const { id: chartId } = useParams<{ id: string }>();
    const summary = useSummary({ chartId, summaryId });

    const export2file = useCallback(() => {
        if (!summary) {
            return;
        }
        const blob = new Blob([summary.text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Summary_4_${summaryId}@${chartId}.md`;
        a.click();
        URL.revokeObjectURL(url);
    }, [summary, summaryId, chartId]);

    const navigate = useNavigate();
    if (!summary) {
        navigate('/summarise');
        return null;
    }

    return (
        <Tooltip title="Export to markdown text file">
            <span>
                <Button
                    startIcon={<FileDownload />}
                    disabled={!summary.text?.length}
                    onClick={export2file}
                    variant="contained"
                    size="small"
                >
                    Export
                </Button>
            </span>
        </Tooltip>
    );
}
