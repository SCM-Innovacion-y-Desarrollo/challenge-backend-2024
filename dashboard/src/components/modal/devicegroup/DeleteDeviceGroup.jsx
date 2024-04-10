import { LoadingButton } from '@mui/lab'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'
import React, { useState } from 'react'
import { deletingDeviceGruopById } from '../../../utils/DeviceGroup'

const DeleteDeviceGroup = ({ reloading, open, setOpen, selected }) => {
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
                    <Typography variant='body3'>Delete Device</Typography>
                </DialogTitle>

                <DialogContent>
                    <p>The process of removing an device group is permanent. do you wish to continue?</p>
                </DialogContent>

                <DialogActions>
                    <Button color='inherit' onClick={() => closing()}>Cancel</Button>

                    <LoadingButton
                        color='error'
                        loading={loading}
                        onClick={() => {
                            deletingDeviceGruopById(setLoading, selected)
                            .then((response) => {
                                reloading()
                                setOpen(false)
                            })
                            .catch((error) => { console.log(error) })
                            .finally(() => { setLoading(false) })
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

export default DeleteDeviceGroup