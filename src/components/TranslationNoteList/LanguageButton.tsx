import { MenuItemProps } from '@mui/base';
import { Delete, Edit, FileDownload } from '@mui/icons-material';
import { Button, IconButtonProps, Menu, MenuItem, Stack } from '@mui/material';
import { getChartId, useDownloadTranslation } from 'helpers';
import { useCallback, useState } from 'react';

import { DeleteFn, TranslateFn } from './types';

export const LanguageButton = ({
    chart,
    language,
    translate,
    deleteChart,
}: {
    chart: Chart;
    language: string;
    translate: TranslateFn;
    deleteChart: DeleteFn;
}) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const showMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const onTranslate = useCallback(
        () =>
            translate({
                id: getChartId(chart),
                language,
            }),
        [chart, language, translate]
    );
    const onDelete = useCallback(() => {
        deleteChart({ id: getChartId(chart), language });
        handleClose();
    }, [chart, deleteChart, language]);
    const { downloadTranslatedChart } = useDownloadTranslation({
        chartId: getChartId(chart),
        language,
        translatedRawNotes: chart.translations[language],
    });
    const onExport = useCallback(() => {
        downloadTranslatedChart();
        handleClose();
    }, [downloadTranslatedChart]);

    const buttonId = `language-button-${language}`;
    const menuId = `language-menu-${language}`;
    return (
        <div>
            <Button
                id={buttonId}
                variant="contained"
                color="secondary"
                aria-controls={open ? menuId : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={showMenu}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Stack direction="row" alignItems="center" gap={1}>
                    <span>{language}</span>
                    <span>{open ? '▲' : '▼'}</span>
                </Stack>
            </Button>
            <Menu
                id={menuId}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': buttonId,
                    style: {
                        minWidth: anchorEl?.offsetWidth,
                    },
                }}
            >
                <CustomMenuItem onClick={onTranslate} label="Edit">
                    <Edit />
                </CustomMenuItem>
                <CustomMenuItem onClick={onExport} label="Export">
                    <FileDownload />
                </CustomMenuItem>
                <CustomMenuItem
                    onClick={onDelete}
                    label="Delete"
                    style={{ color: 'darkred' }}
                >
                    <Delete />
                </CustomMenuItem>
            </Menu>
        </div>
    );
};

type CustomMenuItemProps = { label: string } & Pick<
    MenuItemProps,
    'onClick' | 'style'
> &
    Pick<IconButtonProps, 'children'>;

const CustomMenuItem = ({
    onClick,
    children,
    label,
    style,
}: CustomMenuItemProps) => (
    <MenuItem onClick={onClick} style={style}>
        <Stack direction="row" alignItems="center" gap={1}>
            {children}
            {label}
        </Stack>
    </MenuItem>
);
