import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add'
import { Fade, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import AddDeviceGroup from "../modal/devicegroup/AddDeviceGroup";

const SubMenu = ({realoading, contextMenu, setContextMenu, selected}) => {
    const [openAdd, setOpenAdd] = useState(false)

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

            <AddDeviceGroup realoading={realoading} open={openAdd} setOpen={setOpenAdd} selected={selected}/>
        </>
    );
}

const DeviceGroupTable = () => {
    const columns = [
        { field: 'id', headerName: 'ID', flex: 0.5 },
        { field: 'name', headerName: 'Name', flex: 1 },
        { field: 'description', headerName: 'Description', flex: 1 },
        { field: 'devices', headerName: 'Devices', flex: 1 },
        { field: 'employees', headerName: 'Employees', flex: 1 },
    ]

    const [contextMenu, setContextMenu] = useState(null)
    const [selected, setSelected] = useState(null)
    const [loading, setLoading] = useState(false)

    const realoading = () => {}

    const rows = [
        {
            id: 1,
            name: 'Group 1',
            description: 'Description 1',
            devices: 5,
            employees: 10
        }
    ]

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
                realoading={realoading} 
                contextMenu={contextMenu} 
                setContextMenu={setContextMenu} 
                selected={selected}
            />
        </>
    );
}
 
export default DeviceGroupTable