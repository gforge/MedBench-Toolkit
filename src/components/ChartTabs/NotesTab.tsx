import { styled } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

const gradientStyle = (direction: 'top' | 'bottom') =>
    `linear-gradient(to ${direction}, rgba(85, 64, 33, 0.411) 0%, transparent 40%, transparent 100%)`;
const StyledTabPanel = styled('div')(
    ({
        isActive,
        topGradientHeight,
        bottomGradientHeight,
    }: {
        isActive: boolean;
        topGradientHeight: number;
        bottomGradientHeight: number;
    }) => ({
        marginLeft: 'auto',
        marginRight: 'auto',
        width: 'fit-content',
        position: 'relative',
        overflowY: 'auto', // Ensure the content is scrollable
        height: '100%', // Set a fixed maximum height for scrolling
        ...(isActive && {
            '&::after': {
                content: '""',
                display: 'block',
                position: 'sticky', // Change from 'absolute' to 'sticky'
                left: 0,
                right: 0,
                bottom: 0,
                height: `${bottomGradientHeight}px`,
                background: gradientStyle('top'),
                pointerEvents: 'none', // Change property name to 'pointerEvents'
                zIndex: 2, // Ensure it's above all other content
                transition: 'height 0.2s', // Add transition for smooth effect
                borderRadius: '5px',
                filter: 'blur(2px)',
                marginLeft: '5px',
                marginRight: '5px',
                marginBottom: '2px',
            },
        }),
        ...(isActive && {
            '&::before': {
                content: '""',
                display: 'block',
                position: 'sticky', // Change from 'absolute' to 'sticky'
                left: 0,
                right: 0,
                top: 0,
                height: `${topGradientHeight}px`,
                background: gradientStyle('bottom'),
                pointerEvents: 'none', // Change property name to 'pointerEvents'
                zIndex: 2, // Ensure it's above all other content
                transition: 'height 0.2s', // Add transition for smooth effect
                borderRadius: '5px',
                filter: 'blur(2px)',
                marginLeft: '5px',
                marginRight: '5px',
                marginTop: '2px',
            },
        }),
    })
);

type ChartNoteTabProps = {
    children: React.ReactNode;
    activeTab: string;
};

export const ChartNoteTab = ({ children, activeTab }: ChartNoteTabProps) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [topGradientHeight, setTopGradientHeight] = useState(0);
    const [bottomnGradientHeight, setBottomGradientHeight] = useState(20);

    const checkScrollBottom = () => {
        if (!scrollRef.current) return;
        const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
        const bottomPadding = 20; // Distance from the bottom to start transition
        const gradientMaxHeight = 20; // Max height of the gradient

        if (scrollTop + clientHeight >= scrollHeight - bottomPadding) {
            // Calculate how much of the gradient should be shown
            const overflow =
                scrollTop + clientHeight - (scrollHeight - bottomPadding);
            const visibleHeight = Math.max(gradientMaxHeight - overflow, 0);
            setBottomGradientHeight(visibleHeight);
        } else {
            setBottomGradientHeight(gradientMaxHeight);
        }

        const topGradientVisibility =
            scrollTop > gradientMaxHeight ? gradientMaxHeight : scrollTop;
        setTopGradientHeight(topGradientVisibility);
    };

    useEffect(() => {
        const panel = scrollRef.current;
        if (panel) {
            panel.addEventListener('scroll', checkScrollBottom);
            return () => panel.removeEventListener('scroll', checkScrollBottom);
        }
    }, []);

    return (
        <StyledTabPanel
            ref={scrollRef}
            id="NotesTabPanel"
            isActive={activeTab === 'Notes'}
            topGradientHeight={topGradientHeight}
            bottomGradientHeight={bottomnGradientHeight}
            hidden={activeTab !== 'Notes'}
        >
            {children}
        </StyledTabPanel>
    );
};
