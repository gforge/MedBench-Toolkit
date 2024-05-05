import { TextField } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

export const ResponsiveTextField = ({
    onChange,
    value,
    placeholder,
}: {
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    value: string;
    placeholder: string;
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [rows, setRows] = useState(3); // Initial row count

    useEffect(() => {
        const calculateRows = () => {
            if (containerRef.current) {
                const lineHeight = 24; // Adjust based on your theme's line height for text fields
                const padding = 16; // Sum of vertical padding inside the TextField
                const availableHeight =
                    containerRef.current.clientHeight - padding;
                const calculatedRows = Math.floor(availableHeight / lineHeight);
                setRows(calculatedRows);
            }
        };

        calculateRows();

        // Set up a ResizeObserver to adjust rows on resize
        const resizeObserver = new ResizeObserver(calculateRows);
        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                resizeObserver.unobserve(containerRef.current);
            }
        };
    }, []);

    return (
        <div ref={containerRef} style={{ height: '100%', width: '100%' }}>
            <TextField
                fullWidth
                multiline
                variant="outlined"
                rows={rows}
                onChange={onChange}
                value={value}
                placeholder={placeholder}
                sx={{ height: '100%' }}
            />
        </div>
    );
};
