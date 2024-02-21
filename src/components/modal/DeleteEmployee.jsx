import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material'
import React, { useState } from 'react'
import { DeletingEmployeeByID } from '../../utils/Employees'
import { LoadingButton } from '@mui/lab'

const DeleteEmployee = ({realoading, open, setOpen}) => {
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
                    <Typography variant='p'>Delete Employee</Typography>
                </DialogTitle>

                <DialogContent>
                    <DialogContentText sx={{pt: 1}}>
                        The process of removing an employee is permanent. do you wish to continue?
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button color='inherit' onClick={() => closing()}>Cancel</Button>

                    <LoadingButton 
                        loading={loading}
                        color='error'
                        onClick={() => {
                            DeletingEmployeeByID(setLoading, 1)
                            .then((response) => {
                                realoading()
                                closing()
                            })
                            .catch((error) => {})
                            .finally(() => {
                                setLoading()
                            })
                        }} 
                        autoFocus
                    >
                        Delete
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default DeleteEmployee