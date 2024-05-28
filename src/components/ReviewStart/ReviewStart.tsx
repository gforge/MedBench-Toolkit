import { Box, Chip, Paper, Stack, Typography } from '@mui/material';
import { useState } from 'react';

import { ReviewStartProps } from './types';

export const ReviewStart = ({
    specialties,
    activateReview,
}: ReviewStartProps) => {
    const [selectedSpecialty, setSelectedSpecialty] = useState<string>();
    const [selectedLanguage, setSelectedLanguage] = useState<string>();
    if (selectedLanguage && selectedSpecialty) {
        console.log(`Selected ${selectedLanguage} for ${selectedSpecialty}`);
        activateReview({
            specialty: selectedSpecialty,
            language: selectedLanguage,
        });
    }

    return (
        <Paper sx={{ padding: '10px' }}>
            <Box sx={{ marginBottom: '10px' }}>
                <Typography variant="h6">
                    Specialties and languages to review
                </Typography>
                <Typography variant="body1">
                    Select a specialty and a language that you would like to
                    review
                </Typography>
                {selectedSpecialty && (
                    <Chip
                        key={selectedSpecialty}
                        label={selectedSpecialty}
                        onClick={() => setSelectedSpecialty(undefined)}
                        color={'primary'}
                        sx={{ mb: '1em' }}
                    />
                )}
                <Stack direction="row" gap={1}>
                    {selectedSpecialty &&
                        specialties[selectedSpecialty].map((language) => (
                            <Chip
                                key={language}
                                label={
                                    language === 'original'
                                        ? 'Original'
                                        : language
                                }
                                onClick={() => setSelectedLanguage(language)}
                                color={
                                    language !== selectedLanguage
                                        ? 'default'
                                        : 'primary'
                                }
                            />
                        ))}
                    {!selectedSpecialty &&
                        Object.keys(specialties).map((specialty) => (
                            <Chip
                                key={specialty}
                                label={specialty}
                                onClick={() => setSelectedSpecialty(specialty)}
                                color={'default'}
                            />
                        ))}
                </Stack>
            </Box>
        </Paper>
    );
};
