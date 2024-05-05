import { Assignment, Medication, Science } from '@mui/icons-material';
import { Stack, styled, Tab, Tabs } from '@mui/material';
import { LabValueTable, MedicationsTable } from 'components';
import { useState } from 'react';
import { LabValue, MedicationValue } from 'validators';

import { Note } from './Note';
import { ChartNoteTab } from './NotesTab';
type ChartTabsProps = {
    medications: MedicationValue[];
    labValues: LabValue[];
    notes: Note[];
};

// Style for the container of the tabs and tab panels
const TabContainer = styled(Stack)({
    height: '100%', // adjust height as needed
    flexDirection: 'column',
    width: 'auto',
});

// Style for the scrollable content within tabs
const ScrollableTabPanel = styled('div')({
    overflowY: 'auto',
    maxHeight: 'calc(100% - 48px)', // adjust this depending on the height of your tab headers
    padding: '1rem',
});

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
        <TabContainer>
            <Tabs
                value={activeTab}
                onChange={(_, newValue) => setActiveTab(newValue)}
                indicatorColor="secondary"
                variant="fullWidth"
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
            <ScrollableTabPanel>
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
