import { FC } from 'react';
import { BlobInput } from './BlobInput.tsx';
import { useTemplate } from './TemplateProvider.tsx';
import { TextInput } from './TextInput.tsx';
import { Box, CircularProgress, Typography } from '@mui/material';

export const InputsEditor: FC = () => {
    const { inputs } = useTemplate();

    if (inputs === undefined) {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2 }}>
                <CircularProgress size={20} />
                <Typography variant="body2" color="text.secondary">
                    Loading available inputs...
                </Typography>
            </Box>
        );
    }

    const hasInputs = inputs.blob.length > 0 || inputs.json.length > 0;

    if (!hasInputs) {
        return (
            <Typography variant="body2" color="text.secondary" sx={{ p: 2, textAlign: 'center' }}>
                No inputs defined for this template
            </Typography>
        );
    }

    return (
        <>
            {inputs.blob.map((blobSet) => (
                <BlobInput key={blobSet.key} dataset={blobSet.key} />
            ))}
            {inputs.json.map((jsonSet) => (
                <TextInput key={jsonSet.key} dataset={jsonSet.key} />
            ))}
        </>
    );
};
