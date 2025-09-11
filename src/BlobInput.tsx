import { ChangeEvent, FC } from 'react';
import { imageMimeToTypstFormat } from './imageMimeToTypstFormat.ts';
import { useTemplate } from './TemplateProvider.tsx';
import { BlobWithMetadata } from '../../oicana/integrations/browser/oicana-browser';
import { Box, Button } from '@mui/material';
import { VisuallyHiddenInput } from './preview.styles.ts';

interface BlobInputProps {
    dataset: string;
}

export const BlobInput: FC<BlobInputProps> = ({ dataset }) => {
    const { updateBlobInputs } = useTemplate();

    const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.item(0);
        if (!file) return;
        const reader = new FileReader();
        const fileType = imageMimeToTypstFormat(file.type);

        reader.onload = (e) => {
            if (e.target && e.target.result) {
                const arrayBuffer = e.target.result as ArrayBuffer;
                const uint8Array = new Uint8Array(arrayBuffer);
                const meta = fileType !== undefined ? { image_format: fileType } : {};
                updateBlobInputs(dataset, { bytes: uint8Array, meta } as BlobWithMetadata); // Todo: get rid of cast
            }
        };

        reader.readAsArrayBuffer(file);
    };

    return (
        <Box sx={{ padding: '0 5px' }}>
            <Button sx={{ height: '60px' }} component="label" role={undefined} variant="contained" tabIndex={-1}>
                {`Select ${dataset} file`}
                <VisuallyHiddenInput type="file" onChange={onImageChange} />
            </Button>
        </Box>
    );
};
