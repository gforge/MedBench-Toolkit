import { Tab, Tabs } from '@mui/material';
import { useState } from 'react';

import { LabValueTable } from '../LabValues';
import { MedicationsTable } from '../Medications';

type ChartTabsProps = {
    medications: string[];
    labvalues: string[];
    notes: string[];
};

const TabPanel = ({
    children,
    value,
    id,
}: {
    value: string;
    id: string;
    children: React.ReactNode;
}) => {
    return (
        <div role="tabpanel" id={`tabpanel-${id}`} hidden={value !== id}>
            {children}
        </div>
    );
};

export const ChartTabs = ({
    medications,
    labvalues,
    notes,
}: ChartTabsProps) => {
    const [activeTab, setActiveTab] = useState('Notes');

    return (
        <>
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
            <TabPanel value={activeTab} id="Notes">
                {notes.map((note, i) => (
                    <div key={i}>{note}</div>
                ))}
            </TabPanel>
            <TabPanel value={activeTab} id="Medications">
                <MedicationsTable medications={medications} />
            </TabPanel>
            <TabPanel value={activeTab} id="Lab Values">
                <LabValueTable labvalues={labvalues} />
            </TabPanel>
        </>
    );
};
