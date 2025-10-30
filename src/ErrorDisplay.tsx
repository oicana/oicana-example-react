import { Alert, AlertTitle, Box, Typography } from '@mui/material';
import { FC } from 'react';

interface ErrorDisplayProps {
    error: string;
    onClose: () => void;
}

export const ErrorDisplay: FC<ErrorDisplayProps> = ({ error, onClose }) => {
    return (
        <Box
            sx={{
                width: '100%',
                borderTop: '2px solid',
                borderColor: 'error.main',
            }}
        >
            <Alert
                severity="error"
                onClose={onClose}
                sx={{
                    borderRadius: 0,
                    '& .MuiAlert-message': {
                        width: '100%',
                        maxWidth: '100%',
                    },
                }}
            >
                <AlertTitle sx={{ fontWeight: 'bold', fontSize: '1rem', marginBottom: 1 }}>Error</AlertTitle>
                <Typography
                    component="pre"
                    sx={{
                        fontFamily: 'monospace',
                        fontSize: '0.8125rem',
                        whiteSpace: 'pre',
                        overflow: 'auto',
                        margin: 0,
                        lineHeight: 1.4,
                        textAlign: 'left',
                    }}
                >
                    {error}
                </Typography>
            </Alert>
        </Box>
    );
};
