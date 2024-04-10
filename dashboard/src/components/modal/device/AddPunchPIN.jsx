import { LoadingButton } from '@mui/lab'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { validatePin } from '../../../utils/Employees'
import { addingPunchWithPIN } from '../../../utils/Devices'

const AddPunchPin = ({ reloading, open, setOpen, selected }) => {
    const [dni, setDni] = useState('')
    const [pin, setPin] = useState({
        value: '',
        error: false,
        helperText: ''
    })

    const [loading, setLoading] = useState(false)

    const closing = () => {
        setOpen(false)
        setDni('')
        setPin({
            value: '',
            error: false,
            helperText: ''
        })
    }
    
    return (
        <>
            <Dialog
                open={open}
                onClose={() => closing()}
            >
                <DialogTitle>
                    <Typography variant='body3'>Add new punch with PIN</Typography>
                </DialogTitle>

                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="DNI"
                                sx={{mt: 2}}
                                onChange={(event) => { setDni(event.target.value) }}
                                fullWidth
                                value={dni}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label="PIN"
                                onChange={(event) => { 
                                    if(validatePin(event.target.value)){
                                        setPin({
                                            value: event.target.value, 
                                            error: false, 
                                            helperText: ''
                                        })
                                    }else{
                                        setPin({
                                            value: event.target.value, 
                                            error: true, 
                                            helperText: 'Invalid PIN'
                                        })
                                    }
                                }}
                                fullWidth
                                value={pin.value}
                                error={pin.error}
                                helperText={pin.helperText}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>

                <DialogActions>
                    <Button color='inherit' onClick={() => closing()}>Cancel</Button>

                    <LoadingButton
                        loading={loading}
                        onClick={() => {
                            addingPunchWithPIN(setLoading, dni, pin.value)
                            .then((response) => {
                                reloading()
                                closing()
                            })
                            .catch((error) => { console.log(error) })
                            .finally(() => { setLoading(false) })
                        }} 
                        autoFocus
                        disabled={validatePin(pin.value) && dni.length > 0 ? false : true}
                    >
                        Add
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default AddPunchPin