import { Assignment, Medication, Science } from '@mui/icons-material';
import { Stack, styled, Tab, Tabs } from '@mui/material';
import { LabValueTable, MedicationsTable } from 'components';
import React, { useState } from 'react';
import { LabValue, MedicationValue } from 'validators';

import { Note } from './Note';
import { ChartNoteTab } from './NotesTab';
import { useResize } from './useResize'; // Custom hook for managing resize

type ChartTabsProps = {
    medications: MedicationValue[];
    labValues: LabValue[];
    notes: Note[];
};

const TabContainer = styled(Stack)({
    height: '100%',
    flexDirection: 'column',
    width: 'auto',
    alignItems: 'center',
});

const ScrollableTabPanel = styled('div')({
    overflowY: 'auto',
    maxHeight: 'calc(100% - 48px)',
    padding: '1rem',
    width: 'fit-content',
});

const TabPanel = ({
    children,
    value,
    id,
}: {
    value: string;
    id: string;
    children: React.ReactNode;
}) => (
    <div role="tabpanel" id={`tabpanel-${id}`} hidden={value !== id}>
        {children}
    </div>
);

export const ChartTabs = ({
    medications,
    labValues,
    notes,
}: ChartTabsProps) => {
    const [activeTab, setActiveTab] = useState('Notes');
    const panelId = 'scrollable-tab-panel';
    const tabWidth = useResize({ id: panelId, activeTab }); // Custom hook to manage resize

    const handleTabChange = (
        _: React.ChangeEvent<unknown>,
        newValue: string
    ) => {
        setActiveTab(newValue);
    };

    return (
        <TabContainer>
            <Tabs
                value={activeTab}
                onChange={handleTabChange}
                indicatorColor="secondary"
                variant="fullWidth"
                sx={{
                    minHeight: '74px',
                    width: `${tabWidth}px`, // Applied dynamic width with transition
                    transition: 'width 0.5s',
                }}
            >
                <Tab
                    icon={<Assignment />}
                    iconPosition="start"
                    label="Notes"
                    value="Notes"
                />
                <Tab
                    icon={<Medication />}
                    iconPosition="start"
                    label="Medications"
                    value="Medications"
                />
                <Tab
                    icon={<Science />}
                    iconPosition="start"
                    label="Lab Values"
                    value="Lab Values"
                />
            </Tabs>
            <ScrollableTabPanel id={panelId}>
                <ChartNoteTab activeTab={activeTab}>
                    {notes.map((note, i) => (
                        <Note
                            key={i}
                            first={i === 0}
                            note={note}
                            medications={medications}
                            labValues={labValues}
                        />
                    ))}
                </ChartNoteTab>
                <TabPanel value={activeTab} id="Medications">
                    <MedicationsTable medications={medications} />
                </TabPanel>
                <TabPanel value={activeTab} id="Lab Values">
                    <LabValueTable labValues={labValues} />
                </TabPanel>
            </ScrollableTabPanel>
        </TabContainer>
    );
};
