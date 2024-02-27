import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { AddingEmployeeByID } from '../../utils/Employees'
import { LoadingButton } from '@mui/lab'

const AddEmployee = ({realoading, open, setOpen}) => {
    const [fullname, setFullname] = useState('')
    const [dni, setDni] = useState('')
    const [email, setEmail] = useState('')

    const [loading, setLoading] = useState(false)

    const closing = () => {
        setOpen(false)

        setFullname('')
        setDni('')
        setEmail('') 
    }

    return (
        <>
            <form>
                <Dialog
                    open={open}
                    onClose={() => closing()}
                >
                    <DialogTitle>
                        <Typography variant='body1'>Add Employee</Typography>
                    </DialogTitle>

                    <DialogContent>
                        <Grid container spacing={2}>
                            <Grid item xs={8}>
                                <TextField 
                                    id="fullname" 
                                    label={
                                        <Typography component={'span'} variant={'body2'}>
                                            Fullname
                                        </Typography>
                                    }
                                    variant="outlined"
                                    value={fullname}
                                    onChange={(e) => setFullname(e.target.value)}
                                    fullWidth
                                ></TextField>
                            </Grid>

                            <Grid item xs={4}>
                                <TextField 
                                    id="dni" 
                                    label="DNI" 
                                    variant="outlined"
                                    value={dni}
                                    onChange={(e) => setDni(e.target.value)}
                                    fullWidth
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    id="email"
                                    type='email'
                                    label="Email"
                                    variant="outlined"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>

                    <DialogActions>
                        <Button color='inherit' onClick={() => closing()}>Cancel</Button>

                        <LoadingButton
                            loading={loading}
                            onClick={() => {
                                AddingEmployeeByID(setLoading, fullname, dni, email)
                                .then((response) => { 
                                    closing();
                                    realoading();
                                })
                                .catch((error) => {})
                                .finally(() => setLoading())
                            }} 
                            autoFocus
                        >
                            Add
                        </LoadingButton>
                    </DialogActions>
                </Dialog>
            </form>
        </>
    )
}

export default AddEmployee