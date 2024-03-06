import * as React from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { useState } from 'react';
import { gettingDevices } from '../../../utils/Devices';

function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
    return [...a, ...not(b, a)];
}

const DeviceTransferList = ({deviceSelected, setDeviceSelected}) => {
    const [checked, setChecked] = useState([]);

    const [loading1, setLoading1] = useState(true);
    const [devices, setDevices] = useState([]);
    
    const [left, setLeft] = useState([]);

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, deviceSelected);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const numberOfChecked = (items) => intersection(checked, items).length;

    const handleToggleAll = (items) => () => {
        if (numberOfChecked(items) === items.length) {
            setChecked(not(checked, items));
        } else {
            setChecked(union(checked, items));
        }
    };

    const handleCheckedRight = () => {
        setDeviceSelected(deviceSelected.concat(leftChecked));
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked));
        setDeviceSelected(not(deviceSelected, rightChecked));
        setChecked(not(checked, rightChecked));
    };

    useState(() => {
        gettingDevices(setLoading1)
        .then((response) => {
            setDevices(response.data)
            setLeft(response.data.map((device) => device.id))
        })
        .catch((error) => {})
        .finally(() => setLoading1(false))
    }, [])

    const customList = (title, items) => (
        <Card sx={{ background: 'transparent', border: (theme) => theme.palette.mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(0, 0, 0, 0.12)', }}>
            <CardHeader
                sx={{ px: 2, py: 1}}
                avatar={
                    <Checkbox
                        onClick={handleToggleAll(items)}
                        checked={numberOfChecked(items) === items.length && items.length !== 0}
                        indeterminate={
                            numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0
                        }
                        disabled={items.length === 0 || loading1}
                        inputProps={{
                            'aria-label': 'all items selected',
                        }}
                    />
                }
                title={title}
                subheader={`${numberOfChecked(items)}/${items.length} selected`}
            />

            <Divider />

            <List
                sx={{
                    width: 200,
                    height: 230,
                    bgcolor: 'transparent',
                    overflow: 'auto',
                }}
                dense
                component="div"
                role="list"
            >
                { items.map((value) => {
                    const labelId = `transfer-list-all-item-${value}-label`;

                    return (
                        <ListItemButton
                            key={value}
                            role="listitem"
                            onClick={handleToggle(value)}
                            disabled={loading1}
                        >
                            <ListItemIcon>
                                <Checkbox
                                    disabled={loading1}
                                    checked={checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{
                                        'aria-labelledby': labelId,
                                    }}
                                />
                            </ListItemIcon>

                            <ListItemText id={labelId} primary={devices.find((device) => device.id === value).name} />
                        </ListItemButton>
                    );
                })}
            </List>
        </Card>
    );

  return (
    <Grid sx={{mt: -3}} container spacing={5.2} justifyContent="center" alignItems="center">
      <Grid item>{customList('Unassigned', left)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList('Assigned', deviceSelected)}</Grid>
    </Grid>
  );
}

export default DeviceTransferList;