import React from 'react'
import Navbar from '../../components/navigation/web/Navbar'
import TimecardTable from '../../components/table/TimecardTable'

const Component = () => {
    return (
        <>
            <TimecardTable />
        </>
    )
}

const Timecard = () => {
    return (
        <>
            <Navbar 
                view={{
                    title: 'Timecard',
                    component: <Component />
                }}
                right={null}
            />
        </>
    )
}

export { Timecard } 