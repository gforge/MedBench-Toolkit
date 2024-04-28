import { Box, Tab, Tabs } from '@mui/material';
import { LabValueTable, MedicationsTable } from 'components';
import { useState } from 'react';
import { LabValue, MedicationValue } from 'validators';

type ChartTabsProps = {
    medications: MedicationValue[];
    labValues: LabValue[];
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
    labValues,
    notes,
}: ChartTabsProps) => {
    const [activeTab, setActiveTab] = useState('Notes');

    return (
        <Box sx={{ overflow: 'auto', padding: '2em' }}>
            <Tabs
                value={activeTab}
                onChange={(_, newValue) => setActiveTab(newValue)}
            >
                <Tab label="Notes" value="Notes" />
                <Tab label="Medications" value="Medications" />
                <Tab label="Lab Values" value="Lab Values" />
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
                <LabValueTable labValues={labValues} />
            </TabPanel>
        </Box>
    );
};
