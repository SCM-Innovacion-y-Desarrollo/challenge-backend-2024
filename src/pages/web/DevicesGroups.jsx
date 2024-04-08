import React from 'react'
import Navbar from '../../components/navigation/web/Navbar'
import DeviceGroupTable from '../../components/table/DeviceGroupTable';

const Component = () => {
    return (  
        <>
            <DeviceGroupTable />
        </>
    );
}
 

const DevicesGroups = () => {
    return (
        <>
            <Navbar 
                view={{
                    title: 'Devices Groups',
                    component: <Component />
                }}
                right={null}
            />
        </>
    )
}

export { DevicesGroups } 