import { LoadingButton } from '@mui/lab'
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormGroup, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import moment from 'moment-timezone';
import React, { useEffect, useState } from 'react'
import { addingDevice, gettingDeviceGroups } from '../../../utils/Devices';

const AddDevice = ({ reloading, open, setOpen }) => {
    const [name, setName] = useState('')
    const [location, setLocation] = useState('')
    const [timezone, setTimezone] = useState('')
    const [devicegroups, setDevicegroups] = useState([])
    const [devicegroup, setDevicegroup] = useState('')
    const [pin, setPin] = useState(false)
    const [face, setFace] = useState(false)
    const [loading1, setLoading1] = useState(false)
    const [loading2, setLoading2] = useState(false)

    const closing = () => {
        setOpen(false)
        setName('')
        setLocation('')
        setTimezone('')
        setDevicegroup('')
        setPin(false)
        setFace(false)
        setDevicegroups([])
    }

    useEffect(() => {
        gettingDeviceGroups(setLoading1)
        .then((response) => {
            setDevicegroups(response.data)
        })
        .catch((error) => { console.log(error) })
        .finally(() => { setLoading1(false) })
    }, [])
    
    return (
        <>
            <Dialog
                open={open}
                onClose={() => closing()}
            >
                <DialogTitle>
                    <Typography variant='body3'>Add Device</Typography>
                </DialogTitle>

                <DialogContent>
                    <Grid container spacing={2} sx={{mt: 0.5}}>
                        <Grid item xs={12}>
                            <TextField 
                                id="devicename" 
                                label="Device name"
                                variant="outlined"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                fullWidth
                            ></TextField>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField 
                                id="location" 
                                label="Location"
                                variant="outlined"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                fullWidth
                            ></TextField>
                        </Grid>

                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <InputLabel id="tz">Time zone</InputLabel>
                                <Select
                                    labelId="tz"
                                    id="tzs"
                                    value={timezone}
                                    label="Time zone"
                                    onChange={(event) => { setTimezone(event.target.value) }}
                                    fullWidth
                                    MenuProps={{
                                        style:{ 
                                            maxHeight: '400px',
                                            maxWidth: '200px'
                                        }
                                    }}
                                >
                                    {  moment.tz.names().map((tz, index) => 
                                        <MenuItem key={index} value={tz}>{ tz }</MenuItem>
                                    )}
                                    
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <InputLabel id="dg">Device Group</InputLabel>
                                <Select
                                    labelId="dg"
                                    id="dgs"
                                    value={devicegroup}
                                    label="Device Group"
                                    onChange={(event) => { setDevicegroup(event.target.value) }}
                                    fullWidth
                                    disabled={loading1}
                                    MenuProps={{
                                        style:{ 
                                            maxHeight: '400px',
                                            maxWidth: '200px'
                                        }
                                    }}
                                >
                                    {  devicegroups.map((dg, index) => 
                                        <MenuItem key={index} value={dg.id}>{ dg.name }</MenuItem>
                                    )}
                                    
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant='body1'>Punch type</Typography>

                            <FormGroup sx={{p: 1}}>
                                <FormControlLabel 
                                    control={<Checkbox />} 
                                    label="PIN" 
                                    value={pin} 
                                    onChange={(event) => { 
                                        setPin(event.target.checked)
                                    }}
                                />

                                <FormControlLabel 
                                    control={<Checkbox />} 
                                    label="Face"
                                    value={face}
                                    onChange={(event) => { 
                                        setFace(event.target.checked)
                                    }}
                                />
                            </FormGroup>
                        </Grid>
                    </Grid>
                </DialogContent>

                <DialogActions>
                    <Button color='inherit' onClick={() => closing()}>Cancel</Button>

                    <LoadingButton
                        loading={loading2}
                        onClick={() => {
                            addingDevice(setLoading2, name, location, timezone, devicegroup, pin, face)
                            .then((response) => {
                                reloading()
                                closing()
                            })
                            .catch((error) => { console.log(error) })
                            .finally(() => { setLoading2(false) })
                        }} 
                        autoFocus
                    >
                        Add
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default AddDevice