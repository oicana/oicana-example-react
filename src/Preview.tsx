import { FC, useEffect, useMemo } from 'react';
import { useTemplates } from './LoadingContext.tsx';
import {
    PreviewContent,
    PreviewHeader,
    PreviewOutput,
    PreviewOutputContainer,
    PreviewPage,
    Selects,
} from './preview.styles.ts';
import { ExportFormat, useTemplate } from './TemplateProvider.tsx';
import { InputsEditor } from './InputsEditor.tsx';
import { Box, Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export const Preview: FC = () => {
    const { timings, image, pixelsPerPt, setPixelsPerPt, setTemplateId, templateId, compile, workerState } =
        useTemplate();
    const templates = useTemplates();
    const templateIds = useMemo(() => Array.from(templates.keys()), [templates]);

    useEffect(() => {
        if (templateIds.length > 0) {
            setTemplateId(templateIds[0]);
        }
    }, [templateIds, setTemplateId]);

    const compilePreviewState = () => {
        if (workerState == 'initializing') {
            return <span>Worker is initializing...</span>;
        }
        if (workerState == 'error') {
            return <span>Initialization failed...</span>;
        }
        if (timings.length < 2) {
            return <span>Compiling...</span>;
        }
        return <span>{`Compiled in ${timings[1] - timings[0]}ms`}</span>;
    };

    return (
        <PreviewPage>
            <PreviewHeader>
                <Button variant="contained" onClick={() => compile(ExportFormat.Pdf)}>
                    Export PDF
                </Button>
                <Selects>
                    <Box sx={{ minWidth: 180, minHeight: 50 }}>
                        <FormControl variant={'outlined'} sx={{ width: '100%' }}>
                            <InputLabel id="template-label">Template</InputLabel>
                            <Select
                                labelId="template-label"
                                label="Template"
                                value={templateId}
                                onChange={(e) => {
                                    setTemplateId(e.target.value);
                                }}
                            >
                                {templateIds.map((templateId) => (
                                    <MenuItem value={templateId} key={templateId}>
                                        {templateId}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{ minWidth: 180, minHeight: 50 }}>
                        <FormControl variant={'outlined'} sx={{ width: '100%' }}>
                            <InputLabel id="quality-label">Preview quality</InputLabel>
                            <Select
                                labelId={'quality-label'}
                                label="Preview quality"
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
                    </Box>
                </Selects>
                {compilePreviewState()}
            </PreviewHeader>
            <PreviewContent>
                <InputsEditor />
                <PreviewOutputContainer>
                    {image && <PreviewOutput src={image} alt={'Template preview'} />}
                </PreviewOutputContainer>
            </PreviewContent>
        </PreviewPage>
    );
};
