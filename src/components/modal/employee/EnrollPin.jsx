import { LoadingButton } from '@mui/lab'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { EnrollingPin, validatePin } from '../../../utils/Employees'

const EnrollPin = ({
    realoading, 
    open, 
    setOpen,
    selected
}) => {
    const [pin, setPin] = useState({
        value: '',
        error: false,
        helperText: ''
    })

    const [loading, setLoading] = useState(false)

    const closing = () => {
        setPin({
            value: '',
            error: false,
            helperText: ''
        })
        setOpen(false)
    }

    return (
        <>
            <Dialog
                open={open}
                onClose={() => closing()}
            >
                <DialogTitle>
                    <Typography variant='body3'>Enroll with PIN</Typography>
                </DialogTitle>

                <DialogContent>
                    <TextField
                        label="PIN"
                        sx={{mt: 2}}
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
                        value={pin.value}
                        error={pin.error}
						helperText={pin.helperText}
                    />
                </DialogContent>

                <DialogActions>
                    <Button color='inherit' onClick={() => closing()}>Cancel</Button>

                    <LoadingButton 
                        loading={loading}
                        color='primary'
                        onClick={() => {
                            EnrollingPin(setLoading, selected, pin.value)
                            .then((response) => { 
                                closing();
                                realoading();
                            })
                            .catch((error) => {})
                            .finally(() => setLoading())
                        }}
                        autoFocus
                    >
                        Enroll
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default EnrollPin