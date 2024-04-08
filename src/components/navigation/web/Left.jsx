import React, { useContext, useState } from 'react'
import { Drawer, DrawerHeaderLeft } from './Appbar'
import { Avatar, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, } from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import Darklogo from '../../../assets/DarkLogo.png'
import { GlobalContext } from '../../../GlobalContext'
import GroupsIcon from '@mui/icons-material/Groups'
import PersonIcon from '@mui/icons-material/Person'
import DevicesOtherIcon from '@mui/icons-material/DevicesOther'
import DeviceHubIcon from '@mui/icons-material/DeviceHub'
import BadgeIcon from '@mui/icons-material/Badge';
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import { useLocation, useNavigate } from 'react-router-dom'
import { getMonth } from '../../../utils/Dates'
import moment from 'moment'
import { gettingEmployees } from '../../../utils/Employees'


const Left = () => {
    const { openLeft, handlerSideLeft, setAuthenticated } = useContext(GlobalContext)

    //const { t }    = useTranslation('global')
    const navigate = useNavigate()
    const location = useLocation()

    const [loading, setLoading] = useState(false)

    return (
        <Drawer variant="permanent" open={openLeft}>
            <DrawerHeaderLeft>
                { openLeft ? 
                    <>
                        <img
                            src={Darklogo}
                            alt='logo-app'
                            style={{
                                position: 'absolute', 
                                left: 10, 
                                margin: 10, 
                                width: "100px"
                            }}
                        />

                        <IconButton onClick={() => handlerSideLeft(!openLeft)}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </>
                    :
                    null
                }
            </DrawerHeaderLeft>

            <Divider />

            <List>
                <ListItemButton
                    sx={{ pl: 2.5 }}
                    selected={location.pathname === '/employees'} 
                    onClick={() =>navigate('/')}
                >
                    <ListItemIcon>
                        <GroupsIcon />
                    </ListItemIcon>

                    <ListItemText primary={'Employees'} />
                </ListItemButton>

                <ListItemButton
                    sx={{ pl: 2.5 }}
                    selected={location.pathname === '/devices'} 
                    onClick={() =>navigate('/devices')}
                >
                    <ListItemIcon>
                        <DevicesOtherIcon />
                    </ListItemIcon>

                    <ListItemText primary={'Devices'} />
                </ListItemButton>

                <ListItemButton
                    sx={{ pl: 2.5 }}
                    selected={location.pathname === '/device_groups'} 
                    onClick={() =>navigate('/device_groups')}
                >
                    <ListItemIcon>
                        <DeviceHubIcon />
                    </ListItemIcon>

                    <ListItemText primary={'Device Groups'} />
                </ListItemButton>

                <ListItemButton
                    sx={{ pl: 2.5 }}
                    selected={location.pathname === '/timecard'} 
                    onClick={() =>{
                        const range = getMonth()
                        gettingEmployees(setLoading)
                        .then((response) => {
                            console.log(response.data[0])
                            const employee_id = response.data.length > 0 ? response.data[0].id : ''
                            navigate(`/timecard?start=${moment(range[0]).format('YYYY-MM-DD')}&end=${moment(range[1]).format('YYYY-MM-DD')}&employee_id=${employee_id}`)
                        })
                        .catch((error) => { console.log(error) })
                        .finally(() => {setLoading(false)})
                    }}
                    disabled={loading}
                >
                    <ListItemIcon>
                        <BadgeIcon />
                    </ListItemIcon>

                    <ListItemText primary={'Timecard'}  />
                </ListItemButton>
            </List>

            <List sx={{position: 'absolute', bottom: 0, width: '100%'}}>
                <Divider />

                <ListItem
                    secondaryAction={
                        openLeft ?
                            <IconButton onClick={() => { 
                                setAuthenticated(false)
                                sessionStorage.removeItem('authenticated')
                            }}>
                                <ExitToAppIcon color='error'/>
                            </IconButton>
                            : 
                            null
                    }
                >
                    <ListItemIcon sx={{ml: -0.5}}>
                        <Avatar><PersonIcon /></Avatar>
                    </ListItemIcon>

                    <ListItemText primary={'Username'} secondary={'profile'}/>
                </ListItem>
            </List>    
        </Drawer>
    )
}

export {
    Left
}