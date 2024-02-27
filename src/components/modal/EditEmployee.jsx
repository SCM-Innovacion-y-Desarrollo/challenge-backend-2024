import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { EditingEmployeeByID, gettingEmployeeByID } from '../../utils/Employees'
import { LoadingButton } from '@mui/lab'

const EditEmployee = ({realoading, open, setOpen, selected}) => {
    const [fullname, setFullname] = useState('')
    const [dni, setDni] = useState('')
    const [email, setEmail] = useState('')
    const [loading1, setLoading1] = useState(true)
    const [loading2, setLoading2] = useState(false)

    const closing = () => {
        setOpen(false)

        setFullname('')
        setDni('')
        setEmail('') 
    }

    useEffect(() => {
        if(open){
            gettingEmployeeByID(setLoading1, selected)
            .then((response) => {
                setFullname(response.data.fullname)
                setDni(response.data.dni)
                setEmail(response.data.email)
            })
            .catch((error) => {})
            .finally(() => { setLoading1(false)})
        }

    }, [open, selected])

    return (
        <>
            <Dialog
                open={open}
                onClose={() => closing()}
            >
                <DialogTitle>
                    <Typography variant='p'>Edit Employee</Typography>
                </DialogTitle>

                <DialogContent>
                    <DialogContentText sx={{pt: 1}}>
                        <Grid container spacing={2}>
                            <Grid item xs={8}>
                                <TextField 
                                    id='fullname' 
                                    label='Fullname' 
                                    variant='outlined'
                                    placeholder='loading...'
                                    value={fullname}
                                    onChange={(e) => setFullname(e.target.value)}
                                    fullWidth
                                    disabled={loading1}
                                />
                            </Grid>

                            <Grid item xs={4}>
                                <TextField 
                                    id='dni' 
                                    label='DNI' 
                                    variant='outlined'
                                    placeholder='loading...'
                                    value={dni}
                                    onChange={(e) => setDni(e.target.value)}
                                    fullWidth
                                    disabled={loading1}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    id='email'
                                    type='email'
                                    label='Email'
                                    variant='outlined'
                                    placeholder='loading...'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    fullWidth
                                    disabled={loading1}
                                />
                            </Grid>
                        </Grid>
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button color='inherit' onClick={() => closing()}>Cancel</Button>

                    <LoadingButton 
                        loading={loading2}
                        onClick={() => {
                            EditingEmployeeByID(setLoading2, selected, fullname, dni, email)
                            .then((response) => { 
                                closing();
                                realoading();
                            })
                            .catch((error) => {})
                            .finally(() => setLoading2())
                        }} 
                        autoFocus
                    >
                        Edit
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default EditEmployee