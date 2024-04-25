import {Tab, Tabs} from '@mui/material';
import { useState } from 'react';

type ChartTabsProps = {
    medications: string[];
    labvalues: string[];
    notes: string[];
};

export const ChartTabs = ({
    medications,
    labvalues,
    notes,
}: ChartTabsProps) => {
    const [activeTab, setActiveTab] = useState("Notes");

    return (
        <Tabs
            value={activeTab}
            onChange={(_, newValue) => setActiveTab(newValue)}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
        >
            <Tab label="Notes" />
            <Tab label="Medications" />
            <Tab label="Lab Values" />
        </Tabs>
    );
};