import { LoadingButton } from "@mui/lab";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography } from "@mui/material";
import DeviceTransferList from "../../transferlist/devicegroup/DeviceTransferList";
import EmployeeTransferList from "../../transferlist/devicegroup/EmployeeTransferList";
import { useEffect, useState } from "react";
import { addingDeviceGroup } from "../../../utils/DeviceGroup";
import { gettingDevices } from "../../../utils/Devices";
import { gettingEmployees } from "../../../utils/Employees";
//import DeviceGroupTransferList from "../../transferlist/devicegroup/DeviceTransferList";

const AddDeviceGroup = ({reloading, open, setOpen}) => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    const [loadingAdd, setLoadingAdd] = useState(false)

    const [devices, setDevices] = useState([])
    const [deviceUnselected, setDeviceUnselected] = useState([])
    const [deviceSelected, setDeviceSelected] = useState([])
    const [loadingDevice, setLoadingDevice] = useState(false)

    const [employees, setEmployees] = useState([])
    const [employeeUnselected, setEmployeeUnselected] = useState([])
    const [employeeSelected, setEmployeeSelected] = useState([])
    const [loadingEmployee, setLoadingEmployee] = useState(false)

    const closing = () => {
        setOpen(false)
        setName('')
        setDescription('')
        setDeviceSelected([])
        setEmployeeSelected([])
    }
    
    useEffect(() => {
        if(open){
            gettingDevices(setLoadingDevice)
            .then((r) => {
                setDevices(r.data)
                setDeviceUnselected(r.data.map((device) => device.id))
            })
            .catch((error) => { console.log(error)})
            .finally(() => { setLoadingDevice(false)})

            gettingEmployees(setLoadingEmployee)
            .then((r) => {
                setEmployees(r.data)
                setEmployeeUnselected(r.data.map((employee) => employee.id))
            })
            .catch((error) => { console.log(error)})
            .finally(() => { setLoadingEmployee(false)})
        }
    }, [open])

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
                                devices={devices}
                                setDevices={setDevices}
                                deviceUnselected={deviceUnselected}
                                setDeviceUnselected={setDeviceUnselected}
                                deviceSelected={deviceSelected} 
                                setDeviceSelected={setDeviceSelected}
                                loading={loadingDevice}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant='h6'>Employees</Typography>

                            <EmployeeTransferList
                                employees={employees}
                                setEmployees={setEmployees}
                                employeeUnselected={employeeUnselected}
                                setEmployeeUnselected={setEmployeeUnselected}
                                employeeSelected={employeeSelected} 
                                setEmployeeSelected={setEmployeeSelected}
                                loading={loadingEmployee}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>

                <DialogActions>
                    <Button color='inherit' onClick={() => closing()}>Cancel</Button>

                    <LoadingButton
                        loading={loadingAdd}
                        onClick={() => {
                            addingDeviceGroup(setLoadingAdd, name, description, deviceSelected, employeeSelected)
                            .then((response) => {
                                closing()
                                reloading()
                            })
                            .catch((error) => { console.log(error)})
                            .finally(() => setLoadingAdd(false))
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