import { Assignment, Medication, Science } from '@mui/icons-material';
import { Tab, Tabs } from '@mui/material';
import { LabValueTable, MedicationsTable } from 'components';
import { DetailedHTMLProps, HTMLAttributes, useState } from 'react';
import { LabValue, MedicationValue } from 'validators';

import { Note } from './Note';
type ChartTabsProps = {
    medications: MedicationValue[];
    labValues: LabValue[];
    notes: Note[];
};

const TabPanel = ({
    children,
    value,
    id,
    style,
}: {
    value: string;
    id: string;
    children: React.ReactNode;
} & Pick<
    DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
    'style'
>) => {
    return (
        <div
            role="tabpanel"
            id={`tabpanel-${id}`}
            hidden={value !== id}
            style={style}
        >
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
        <>
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
            <TabPanel
                value={activeTab}
                id="Notes"
                style={{
                    marginLeft: 'auto',
                    marginRight: 'auto',
                }}
            >
                {notes.map((note, i) => (
                    <Note
                        key={i}
                        first={i === 0}
                        note={note}
                        medications={medications}
                        labValues={labValues}
                    />
                ))}
            </TabPanel>
            <TabPanel value={activeTab} id="Medications">
                <MedicationsTable medications={medications} />
            </TabPanel>
            <TabPanel value={activeTab} id="Lab Values">
                <LabValueTable labValues={labValues} />
            </TabPanel>
        </>
    );
};
