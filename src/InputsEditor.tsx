import { FC } from 'react';
import { BlobInput } from './BlobInput.tsx';
import { useTemplate } from './TemplateProvider.tsx';
import { TextInput } from './TextInput.tsx';

export const InputsEditor: FC = () => {
    const { inputs } = useTemplate();

    if (inputs === undefined) {
        return <span>Loading available inputs...</span>;
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
