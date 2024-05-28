import { styled } from '@mui/material';

export const TopBox = styled('div')`
    display: flex;
    flex-direction: column;
    height: 70%;
    overflow-y: auto;
    position: relative;
`;

export const BottomBox = styled('div')`
    display: flex;
    flex-direction: column;
    height: calc(30% - 20px);
    overflow-y: auto;
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 10px;
    margin-top: 20px;
    max-width: 1000px;
    min-width: 600px;
    margin-left: auto;
    margin-right: auto;
`;

export const FlexBox = styled('div')`
    paddingtop: 20px;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    overflow-y: auto;
`;
