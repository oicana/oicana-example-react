import styled from '@emotion/styled';
import { TextField } from '@mui/material';

const headerHeight = 70;

export const PreviewPage = styled.div`
    display: flex;
    flex-direction: column;
`;

export const PreviewHeader = styled.div`
    height: ${headerHeight}px;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
`;

export const PreviewContent = styled.div`
    display: flex;
    flex-grow: 1;
    height: calc(100vh - ${headerHeight}px);
`;

export const PreviewOutputContainer = styled.div`
    background-color: grey;
    height: 100%;
    overflow-y: scroll;
    width: 50%;
`;

export const PreviewOutput = styled.img`
    width: 90%;
    padding: 10px 0;
`;

export const PreviewInput = styled(TextField)`
    padding: 0 5px;
    width: 50%;
`;

export const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export const Selects = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
`;
