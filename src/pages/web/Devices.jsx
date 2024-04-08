import React from 'react'
import Navbar from '../../components/navigation/web/Navbar'
import DeviceTable from '../../components/table/DeviceTable'

const Component = () => {
    return (
        <>
            <DeviceTable />
        </>
    )
}

const Devices = () => {
    return (
        <>
            <Navbar 
                view={{
                    title: 'Devices',
                    component: <Component />
                }}
                right={null}
            />
        </>
    )
}

export { Devices } 