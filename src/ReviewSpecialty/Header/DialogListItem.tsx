import { ArrowRightOutlined } from '@mui/icons-material';
import {
    ListItem,
    ListItemIcon,
    ListItemText,
    ListItemTextProps,
} from '@mui/material';

export const DialogListItem = ({
    primary,
    secondary,
}: Pick<ListItemTextProps, 'primary' | 'secondary'>) => (
    <ListItem>
        <ListItemIcon>
            <ArrowRightOutlined />
        </ListItemIcon>
        <ListItemText primary={primary} secondary={secondary} />
    </ListItem>
);
