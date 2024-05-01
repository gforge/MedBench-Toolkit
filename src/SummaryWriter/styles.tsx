import { styled } from '@mui/material';

export const TopBox = styled('div')`
    display: flex;
    flex-direction: column;
    height: 70%;
    overflow-y: auto;
`;

export const BottomBox = styled('div')`
    display: flex;
    flex-direction: column;
    height: 30%;
    overflow-y: auto;
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 10px;
    margin-top: 10px;
`;

export const FlexBox = styled('div')`
    paddingtop: 20px;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    overflow-y: auto;
`;
