import { DataGrid } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import { gettingEmployees } from '../../utils/Employees'
import { Fade, Grid, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material'
import FaceIcon from '@mui/icons-material/Face'
import FiberPinIcon from '@mui/icons-material/FiberPin'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import FingerprintIcon from '@mui/icons-material/Fingerprint'
import AddEmployee from '../modal/AddEmployee'
import EditEmployee from '../modal/EditEmployee'
import DeleteEmployee from '../modal/DeleteEmployee'

const SubMenu = ({realoading, contextMenu, setContextMenu}) => {
    const [openAdd, setOpenAdd] = useState(true)
    const [openEdit, setOpenEdit] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)

    const options = [
        {
            name: 'Add',
            icon: <AddIcon />,
            click: () => {
                setOpenAdd(true)
                setContextMenu(null)
            },
        },
        {
            name: 'Edit',
            icon: <EditIcon />,
            click: () => {
                setOpenEdit(true)
                setContextMenu(null)
            }
        },
        {
            name: 'Delete',
            icon: <DeleteIcon />,
            click: () => {
                setOpenDelete(true)
                setContextMenu(null)
            }
        },
        {
            name: 'Enroll with PIN',
            icon: <FingerprintIcon />
        },
        {
            name: 'Enroll with Face',
            icon: <FaceIcon />
        }
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
                        <MenuItem key={index} onClick={option.click}>
                            <ListItemIcon>
                                { option.icon }
                            </ListItemIcon>

                            <ListItemText> { option.name } </ListItemText>
                        </MenuItem>
                    )
                }
            </Menu>

            <AddEmployee realoading={realoading} open={openAdd} setOpen={setOpenAdd} />
            <EditEmployee realoading={realoading} open={openEdit} setOpen={setOpenEdit} />
            <DeleteEmployee realoading={realoading} open={openDelete} setOpen={setOpenDelete} />
        </>
    )
}

const EmployeeTable = () => {
    const [loading, setLoading] = useState(false)

    const columns = [
        { field: 'id', headerName: 'Id', flex: 0.5 },
        { field: 'fullname', headerName: 'Full name', flex: 1 },
        { field: 'email', headerName: 'Email', flex: 1 },
        { field: 'dni', headerName: 'Dni', flex: 1 },
        { field: 'device_group', headerName: 'Device group', flex: 1},
        { 
            field: 'enrollments', 
            headerName: 'Enrollments', 
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

    const realoading = () => {
        gettingEmployees(setLoading)
        .then((response) => {
            setRows(response.data)
        })
        .catch((error) => { setRows([])})
        .finally(() => setLoading(false))
    }

    useEffect(() => {
        document.addEventListener("contextmenu", (event) => {
			event.preventDefault()
		})

        gettingEmployees(setLoading)
        .then((response) => {
            setRows(response.data)
        })
        .catch((error) => { setRows([])})
        .finally(() => setLoading(false))

    }, [])

    return (
        <>
            <div style={{width: '100%', height: '86.3vh'}} onContextMenu={(event) => {
                    setContextMenu(contextMenu === null ? { mouseX: event.clientX + 2, mouseY: event.clientY - 6} : null)
            }}>
                <DataGrid
                    sx={{ height: '85.8vh', width: '100%' }}
                    rows={rows}
                    columns={columns}
                    checkboxSelection
                    loading={loading}
                />
            </div>

            <SubMenu realoading={realoading} contextMenu={contextMenu} setContextMenu={setContextMenu}/>
        </>
    )
}

export default EmployeeTable