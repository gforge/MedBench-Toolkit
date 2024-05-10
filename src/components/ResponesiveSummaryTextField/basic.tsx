import { TextField } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';

/**
 * A basic text field that adjusts its height based on its container's height.
 * The text field is a standard MUI TextField.
 */
export const BasicTextField = ({
    onChange,
    value,
    placeholder,
    containerRef,
}: {
    onChange: (text: string) => void;
    value: string;
    placeholder: string;
    containerRef: React.RefObject<HTMLDivElement>;
}) => {
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
        const currentContainerRef = containerRef.current; // Copy the value of containerRef.current to a variable
        if (currentContainerRef) {
            resizeObserver.observe(currentContainerRef);
        }

        return () => {
            if (currentContainerRef) {
                // Use the variable in the cleanup function
                resizeObserver.unobserve(currentContainerRef);
            }
        };
    }, [containerRef]);

    const onTextFieldChange = useCallback(
        (event: React.ChangeEvent<HTMLTextAreaElement>) => {
            onChange(event.target.value);
        },
        [onChange]
    );

    return (
        <TextField
            fullWidth
            multiline
            variant="outlined"
            rows={rows}
            onChange={onTextFieldChange}
            value={value}
            placeholder={placeholder}
            sx={{ height: '100%' }}
        />
    );
};
