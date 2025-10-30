import { Alert, AlertTitle, Box, Collapse, Typography } from '@mui/material';
import { FC } from 'react';

interface ErrorDisplayProps {
    error: string;
    onClose: () => void;
}

export const ErrorDisplay: FC<ErrorDisplayProps> = ({ error, onClose }) => {
    return (
        <Collapse in={!!error}>
            <Box sx={{ width: '100%' }}>
                <Alert
                    severity="error"
                    onClose={onClose}
                    sx={{
                        borderRadius: 2,
                        '& .MuiAlert-message': {
                            width: '100%',
                            maxWidth: '100%',
                        },
                        animation: 'slideIn 0.3s ease-out',
                        '@keyframes slideIn': {
                            from: {
                                opacity: 0,
                                transform: 'translateY(-10px)',
                            },
                            to: {
                                opacity: 1,
                                transform: 'translateY(0)',
                            },
                        },
                    }}
                >
                    <AlertTitle sx={{ fontWeight: 'bold', fontSize: '1rem', marginBottom: 1 }}>
                        Compilation Error
                    </AlertTitle>
                    <Typography
                        component="pre"
                        sx={{
                            fontFamily: 'monospace',
                            fontSize: '0.8rem',
                            whiteSpace: 'pre-wrap',
                            overflow: 'auto',
                            margin: 0,
                            lineHeight: 1.6,
                            textAlign: 'left',
                            maxHeight: '200px',
                        }}
                    >
                        {error}
                    </Typography>
                </Alert>
            </Box>
        </Collapse>
    );
};
