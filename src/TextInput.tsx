import { FC, useEffect, useState } from 'react';
import { useTemplate } from './TemplateProvider.tsx';
import { PreviewInput } from './preview.styles.ts';

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
        <PreviewInput
            id="outlined-multiline-static"
            label={dataset}
            multiline
            rows={10}
            onChange={(e) => {
                setInput(e.currentTarget.value);
                updateJsonInputs(dataset, e.currentTarget.value);
            }}
            value={input}
        />
    );
};
