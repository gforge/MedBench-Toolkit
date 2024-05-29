import { styled } from '@mui/material';

export const ChartBox = styled('div')`
    display: flex;
    flex-direction: column;
    height: 100%;
    min-width: 650px;
    width: 45%;
    overflow-y: auto;
    position: relative;
`;

export const ReviewBox = styled('div')`
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 10px;
    margin-top: 20px;
    width: 50%;
    margin-left: auto;
    margin-right: auto;
    height: fit-content;
`;

export const FlexBox = styled('div')`
    padding-top: 0px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center; // Add this line to center the items horizontally
    align-items: center; // Add this line to center the items vertically
    height: calc(100% - 30px - 20px); // Remove the height from the navigator
    width: 100%;
    overflow-y: auto;
`;
