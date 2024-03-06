import { LoadingButton } from "@mui/lab";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography } from "@mui/material";
import DeviceTransferList from "../../transferlist/devicegroup/DeviceTransferList";
import EmployeeTransferList from "../../transferlist/devicegroup/EmployeeTransferList";
import { useEffect, useState } from "react";
import { addingDeviceGroup, gettingDeviceGroupById } from "../../../utils/DeviceGroup";
import { gettingDevices } from "../../../utils/Devices";
import { gettingEmployees } from "../../../utils/Employees";
//import DeviceGroupTransferList from "../../transferlist/devicegroup/DeviceTransferList";

const EditDeviceGroup = ({reloading, open, setOpen, selected}) => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    const [devices, setDevices] = useState([])
    const [deviceUnselected, setDeviceUnselected] = useState([])
    const [deviceSelected, setDeviceSelected] = useState([])
    const [loadingDevice, setLoadingDevice] = useState(false)

    const [employees, setEmployees] = useState([])
    const [employeeUnselected, setEmployeeUnselected] = useState([])
    const [employeeSelected, setEmployeeSelected] = useState([])
    const [loadingEmployee, setLoadingEmployee] = useState(false)

    const [loadingEdit, setLoadingEdit] = useState(false)
    const [loadingDg, setLoadingDg] = useState(false)
    

    const closing = () => {
        setOpen(false)
        setName('')
        setDescription('')

        setDevices([])
        setDeviceUnselected([])
        setDeviceSelected([])

        setEmployees([])
        setEmployeeUnselected([])
        setEmployeeSelected([])
    }
    
    useEffect(() => {
        if(open){
            gettingDevices(setLoadingDevice)
            .then((r) => {
                setDevices(r.data)

                gettingDeviceGroupById(setLoadingDg, selected)
                .then((response) => {
                    setName(response.data.name)
                    setDescription(response.data.description)
                    setDeviceUnselected(r.data.filter((device) => !response.data.devices.includes(device.id)).map((device) => device.id))
                    setDeviceSelected(response.data.devices)
                })
                .catch((error) => { console.log(error)})
                .finally(() => { setLoadingDg(false)})
            })
            .catch((error) => { console.log(error)})
            .finally(() => { setLoadingDevice(false)})
            
    

            gettingEmployees(setLoadingEmployee)
            .then((r) => {
                setEmployees(r.data)

                gettingDeviceGroupById(setLoadingDg, selected)
                .then((response) => {
                    setName(response.data.name)
                    setDescription(response.data.description)
                    setEmployeeUnselected(r.data.filter((employee) => !response.data.employees.includes(employee.id)).map((employee) => employee.id))
                    setEmployeeSelected(response.data.employees)
                })
                .catch((error) => { console.log(error)})
                .finally(() => { setLoadingDg(false)})
            })
            .catch((error) => { console.log(error)})
            .finally(() => { setLoadingEmployee(false)})
        }
    }, [selected, open])

    return (
        <>
            <Dialog
                open={open}
                onClose={() => closing()}
            >
                <DialogTitle>
                    <Typography variant='body3'>Edit Device group</Typography>
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
                                loading={loadingDevice || loadingDg}
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
                                loading={loadingEmployee || loadingDg}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>

                <DialogActions>
                    <Button color='inherit' onClick={() => closing()}>Cancel</Button>

                    <LoadingButton
                        loading={loadingEdit}
                        onClick={() => {
                            addingDeviceGroup(setLoadingEdit, name, description, deviceSelected, employeeSelected)
                            .then((response) => {
                                console.log(response.data)
                                closing()
                                reloading()
                            })
                            .catch((error) => { console.log(error)})
                            .finally(() => setLoadingEdit(false))
                        }} 
                        autoFocus
                    >
                        Edit
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </>
    );
}
 
export default EditDeviceGroup;