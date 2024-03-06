import { LoadingButton } from "@mui/lab";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography } from "@mui/material";
import DeviceTransferList from "../../transferlist/devicegroup/DeviceTransferList";
import EmployeeTransferList from "../../transferlist/devicegroup/EmployeeTransferList";
import { useState } from "react";
import { addingDeviceGroup } from "../../../utils/DeviceGroup";
//import DeviceGroupTransferList from "../../transferlist/devicegroup/DeviceTransferList";

const AddDeviceGroup = ({realoading, open, setOpen}) => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [deviceSelected, setDeviceSelected] = useState([])
    const [employeeSelected, setEmployeeSelected] = useState([])
    const [loading, setLoading] = useState(false)

    const closing = () => {
        setOpen(false)
        setName('')
        setDescription('')
        setDeviceSelected([])
        setEmployeeSelected([])
    }
    
    return (
        <>
            <Dialog
                open={open}
                onClose={() => closing()}
            >
                <DialogTitle>
                    <Typography variant='body3'>Add Device group</Typography>
                </DialogTitle>

                <DialogContent>
                    <Grid container spacing={2} sx={{mt: 1}}>
                        <Grid item xs={12}>
                            <TextField
                                id="Name" 
                                label="Name"
                                variant="outlined"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField 
                                id="Description" 
                                label="Description"
                                variant="outlined"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                fullWidth
                                multiline
                                rows={3}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant='h6'>Devices</Typography>

                            <DeviceTransferList 
                                deviceSelected={deviceSelected} 
                                setDeviceSelected={setDeviceSelected}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant='h6'>Employees</Typography>

                            <EmployeeTransferList 
                                employeeSelected={employeeSelected} 
                                setEmployeeSelected={setEmployeeSelected}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>

                <DialogActions>
                    <Button color='inherit' onClick={() => closing()}>Cancel</Button>

                    <LoadingButton
                        loading={loading}
                        onClick={() => {
                            addingDeviceGroup(setLoading, name, description, deviceSelected, employeeSelected, realoading)
                            .then((response) => {
                                closing()
                            })
                            .catch((error) => { console.log(error)})
                            .finally(() => setLoading(false))
                        }} 
                        autoFocus
                    >
                        Add
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </>
    );
}
 
export default AddDeviceGroup;