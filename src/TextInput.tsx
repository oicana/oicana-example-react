import { FC, useEffect, useState } from 'react';
import { useTemplate } from './TemplateProvider.tsx';
import { Card, CardContent, TextField, Typography } from '@mui/material';

interface TextInputProps {
    dataset: string;
}

export const TextInput: FC<TextInputProps> = ({ dataset }) => {
    const { updateJsonInputs, defaultJsonDatasets } = useTemplate();
    const [input, setInput] = useState<string>('');

    useEffect(() => {
        setInput(defaultJsonDatasets.get(dataset) ?? '');
    }, [defaultJsonDatasets, dataset]);

    return (
        <Card elevation={2} sx={{ transition: 'all 0.2s ease-in-out', '&:hover': { elevation: 4 } }}>
            <CardContent>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ mb: 1 }}>
                    JSON Input
                </Typography>
                <TextField
                    fullWidth
                    label={dataset}
                    multiline
                    rows={8}
                    onChange={(e) => {
                        setInput(e.currentTarget.value);
                        updateJsonInputs(dataset, e.currentTarget.value);
                    }}
                    value={input}
                    variant="outlined"
                    sx={{
                        '& .MuiInputBase-input': {
                            fontFamily: 'monospace',
                            fontSize: '0.875rem',
                        },
                    }}
                />
            </CardContent>
        </Card>
    );
};
