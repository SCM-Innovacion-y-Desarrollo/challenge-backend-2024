import { DataGrid } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import { gettingDevices } from '../../utils/Devices'
import { Fade, Grid, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import FaceIcon from '@mui/icons-material/Face'
import FiberPinIcon from '@mui/icons-material/FiberPin'
import AddDevice from '../modal/device/AddDevice'
import EditDevice from '../modal/device/EditDevice'
import DeleteDevice from '../modal/device/DeleteDevice'
import AddPunchPin from '../modal/device/AddPunchPIN'
import AddPunchFace from '../modal/device/AddPunchFace'

const SubMenu = ({reloading, contextMenu, setContextMenu, selected}) => {
    const [openAdd, setOpenAdd] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const [openPunchPin, setOpenPunchPin] = useState(false)
    const [openPunchFace, setOpenPunchFace] = useState(false)

    const options = [
        {
            name: 'Add',
            icon: <AddIcon />,
            click: () => {
                setOpenAdd(true)
                setContextMenu(null)
            },
            disabled: false
        },
        {
            name: 'Edit',
            icon: <EditIcon />,
            click: () => {
                setOpenEdit(true)
                setContextMenu(null)
            },
            disabled: !Boolean(selected)
        },
        {
            name: 'Delete',
            icon: <DeleteIcon />,
            click: () => {
                setOpenDelete(true)
                setContextMenu(null)
            },
            disabled: !Boolean(selected)
        },
        {
            name: 'Punch with PIN',
            icon: <FiberPinIcon />,
            click: () => {
                setOpenPunchPin(true)
                setContextMenu(null)
            },
            disabled: !Boolean(selected)
        },
        {
            name: 'Punch with Face',
            icon: <FaceIcon />,
            click: () => {
                setOpenPunchFace(true)
                setContextMenu(null)
            },
            disabled: !Boolean(selected)
        },
    ]

    return (
        <>
            <Menu
                open={Boolean(contextMenu)}
                onClose={() => setContextMenu(null)}
                anchorReference='anchorPosition'
                TransitionComponent={Fade}
                anchorPosition={
                    contextMenu !== null ? { top: contextMenu.mouseY, left: contextMenu.mouseX } : null 
                }
            >
                { 
                    options.map((option, index) => 
                        <MenuItem key={index} onClick={option.click} disabled={option.disabled}>
                            <ListItemIcon>
                                { option.icon }
                            </ListItemIcon>

                            <ListItemText> { option.name } </ListItemText>
                        </MenuItem>
                    )
                }
            </Menu>

            <AddDevice reloading={reloading} open={openAdd} setOpen={setOpenAdd} selected={selected} />
            <EditDevice reloading={reloading} open={openEdit} setOpen={setOpenEdit} selected={selected} />
            <DeleteDevice reloading={reloading} open={openDelete} setOpen={setOpenDelete} selected={selected} />
            <AddPunchPin reloading={reloading} open={openPunchPin} setOpen={setOpenPunchPin} selected={selected} />
            <AddPunchFace reloading={reloading} open={openPunchFace} setOpen={setOpenPunchFace} selected={selected} />
        </>
    )
}

const DeviceTable = () => {
    const columns = [
        { field: 'id', headerName: 'ID', flex: 0.5 },
        { field: 'name', headerName: 'Name', flex: 1 },
        { field: 'location', headerName: 'Location', flex: 1 },
        { field: 'timezone', headerName: 'Time zone', flex: 1 },
        { field: 'device_group', headerName: 'Device Group', flex: 1 },
        { 
            field: 'punch_type', 
            headerName: 'Punch type', 
            headerAlign: 'center',
            flex: 1,
            renderCell: (params) => (
				<Grid container>
					<Grid item xs={6}>
						<center><FaceIcon style={params.value.face ? { color: '#4caf50'} : {color: 'rgba(158, 158, 158, 0.5)'}}/></center>
					</Grid>
					<Grid item xs={6} style={params.value.pin ? { color: '#4caf50'} : {color: 'rgba(158, 158, 158, 0.5)'}}>
                        <center><FiberPinIcon/></center>
					</Grid>
				</Grid>
			)
        },
    ]

    const [rows, setRows] = useState([])
    const [contextMenu, setContextMenu] = useState(null)
    const [loading, setLoading] = useState(false)
    const [selected, setSelected] = useState(null)

    const reloading = () => {
        gettingDevices(setLoading)
        .then((response) => {
            setRows(response.data)
        })
        .catch((error) => { console.log(error) })
        .finally(() => { setLoading(false) })
    }

    useEffect(() => {
        gettingDevices(setLoading)
        .then((response) => {
            setRows(response.data)
        })
        .catch((error) => { console.log(error) })
        .finally(() => { setLoading(false) })
    }, [])

    return (
        <>
            <div 
                style={{width: '100%', height: '86.3vh'}} 
                onContextMenu={(event) => {
                    setContextMenu(contextMenu === null ? { mouseX: event.clientX + 2, mouseY: event.clientY - 6} : null)
                }}
            >
                <DataGrid
                    sx={{ height: '85.8vh', width: '100%' }}
                    rows={rows}
                    columns={columns}
                    loading={loading}
                    onRowSelectionModelChange={(data) => setSelected(data[0])}
                />
            </div>

            <SubMenu 
                reloading={reloading} 
                contextMenu={contextMenu} 
                setContextMenu={setContextMenu} 
                selected={selected}
            />
        </>
    )
}

export default DeviceTable