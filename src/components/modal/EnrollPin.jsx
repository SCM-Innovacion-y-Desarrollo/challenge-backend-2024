import { LoadingButton } from '@mui/lab'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material'
import React, { useState } from 'react'

const EnrollPin = ({realoading, open, setOpen}) => {

    const [loading, setLoading] = useState(false)

    const closing = () => {
        setOpen(false)
    }

    return (
        <>
            <Dialog
                open={open}
                onClose={() => closing()}
            >
                <DialogTitle>
                    <Typography variant='p'>Enroll with PIN</Typography>
                </DialogTitle>

                <DialogContent>
                    <DialogContentText sx={{pt: 1}}>
                        <p>The process of removing an employee is permanent. do you wish to continue?</p>
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button color='inherit' onClick={() => closing()}>Cancel</Button>

                    <LoadingButton 
                        loading={loading}
                        color='error'
                        onClick={() => {setLoading(false)} }
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