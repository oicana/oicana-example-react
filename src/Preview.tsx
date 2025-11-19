import { FC, useEffect, useMemo, useState } from 'react';
import { useTemplates } from './LoadingContext.tsx';
import { ExportFormat, useTemplate } from './TemplateProvider.tsx';
import { InputsEditor } from './InputsEditor.tsx';
import {
    AppBar,
    Box,
    Button,
    Chip,
    Drawer,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Stack,
    Toolbar,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { ErrorDisplay } from './ErrorDisplay.tsx';

export const Preview: FC = () => {
    const {
        timings,
        image,
        pixelsPerPt,
        setPixelsPerPt,
        setTemplateId,
        templateId,
        compile,
        workerState,
        error,
        clearError,
    } = useTemplate();
    const templates = useTemplates();
    const templateIds = useMemo(() => Array.from(templates.keys()), [templates]);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [drawerOpen, setDrawerOpen] = useState(false);

    useEffect(() => {
        if (templateIds.length > 0) {
            setTemplateId(templateIds[0]);
        }
    }, [templateIds, setTemplateId]);

    const compilePreviewState = () => {
        if (workerState === 'initializing') {
            return <Chip label="Initializing..." color="default" size="small" sx={{ fontFamily: 'monospace' }} />;
        }
        if (workerState === 'error') {
            return <Chip label="Initialization failed" color="error" size="small" sx={{ fontFamily: 'monospace' }} />;
        }
        if (timings.length < 2) {
            return <Chip label="Compiling..." color="primary" size="small" sx={{ fontFamily: 'monospace' }} />;
        }
        return (
            <Chip
                label={`Compiled in ${timings[1] - timings[0]}ms`}
                color="success"
                size="small"
                sx={{ fontFamily: 'monospace' }}
            />
        );
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
                bgcolor: 'background.default',
                overflow: 'hidden',
            }}
        >
            <AppBar position="static" elevation={2} sx={{ bgcolor: 'background.paper', flexShrink: 0 }}>
                <Toolbar sx={{ gap: 2, flexWrap: 'wrap', py: 1 }}>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            flexGrow: { xs: 1, md: 0 },
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            fontWeight: 700,
                            display: { xs: 'none', sm: 'block' },
                        }}
                    >
                        Oicana
                    </Typography>

                    {isMobile && (
                        <Button variant="outlined" onClick={() => setDrawerOpen(true)} size="small">
                            Inputs
                        </Button>
                    )}

                    <FormControl variant="outlined" size="small" sx={{ minWidth: 160 }}>
                        <InputLabel id="template-label">Template</InputLabel>
                        <Select
                            labelId="template-label"
                            label="Template"
                            value={templateId}
                            onChange={(e) => setTemplateId(e.target.value)}
                        >
                            {templateIds.map((id) => (
                                <MenuItem value={id} key={id}>
                                    {id}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl variant="outlined" size="small" sx={{ minWidth: 160 }}>
                        <InputLabel id="quality-label">Quality</InputLabel>
                        <Select
                            labelId="quality-label"
                            label="Quality"
                            value={pixelsPerPt}
                            onChange={(e) => {
                                setPixelsPerPt(
                                    typeof e.target.value === 'string' ? parseInt(e.target.value) : e.target.value,
                                );
                            }}
                        >
                            <MenuItem value={1}>Good (1px/pt)</MenuItem>
                            <MenuItem value={2}>Better (2px/pt)</MenuItem>
                            <MenuItem value={3}>Epic (3px/pt)</MenuItem>
                        </Select>
                    </FormControl>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'block' } }} />

                    {compilePreviewState()}

                    <Button
                        variant="contained"
                        onClick={() => compile(ExportFormat.Pdf)}
                        size={isMobile ? 'small' : 'medium'}
                    >
                        Export PDF
                    </Button>
                </Toolbar>
            </AppBar>

            <Box sx={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
                <Grid container sx={{ height: '100%', overflow: 'hidden' }} spacing={0}>
                    {!isMobile && (
                        <Grid
                            item
                            xs={12}
                            md={5}
                            lg={4}
                            sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                        >
                            <Box
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    bgcolor: 'background.paper',
                                    borderRight: 1,
                                    borderColor: 'divider',
                                    overflow: 'hidden',
                                }}
                            >
                                <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
                                    <Typography variant="h6">Template Inputs</Typography>
                                </Box>
                                <Box
                                    sx={{
                                        flex: 1,
                                        overflow: 'auto',
                                        p: 3,
                                    }}
                                >
                                    <Stack spacing={3}>
                                        <InputsEditor />
                                    </Stack>
                                </Box>
                                {error && (
                                    <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
                                        <ErrorDisplay error={error} onClose={clearError} />
                                    </Box>
                                )}
                            </Box>
                        </Grid>
                    )}

                    <Grid item xs={12} md={7} lg={8} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <Box
                            sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                background:
                                    'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)',
                                p: { xs: 2, md: 3 },
                                overflow: 'auto',
                            }}
                        >
                            <Paper
                                elevation={3}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    p: 2,
                                    bgcolor: 'grey.900',
                                }}
                            >
                                {image ? (
                                    <Box
                                        component="img"
                                        src={image}
                                        alt="Template preview"
                                        sx={{
                                            maxWidth: '100%',
                                            height: 'auto',
                                        }}
                                    />
                                ) : (
                                    <Typography variant="body1" color="text.secondary">
                                        Preview will appear here
                                    </Typography>
                                )}
                            </Paper>
                        </Box>
                    </Grid>
                </Grid>
            </Box>

            {isMobile && (
                <Drawer
                    anchor="bottom"
                    open={drawerOpen}
                    onClose={() => setDrawerOpen(false)}
                    PaperProps={{
                        sx: {
                            maxHeight: '80vh',
                            borderTopLeftRadius: 16,
                            borderTopRightRadius: 16,
                            display: 'flex',
                            flexDirection: 'column',
                        },
                    }}
                >
                    <Box sx={{ p: 3, borderBottom: error ? 1 : 0, borderColor: 'divider' }}>
                        <Typography variant="h6">Template Inputs</Typography>
                    </Box>
                    <Box sx={{ flex: 1, overflow: 'auto', p: 3 }}>
                        <Stack spacing={3}>
                            <InputsEditor />
                        </Stack>
                    </Box>
                    {error && (
                        <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
                            <ErrorDisplay error={error} onClose={clearError} />
                        </Box>
                    )}
                </Drawer>
            )}
        </Box>
    );
};
