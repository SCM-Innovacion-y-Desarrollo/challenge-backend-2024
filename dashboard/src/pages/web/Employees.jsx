import React from 'react'
import Navbar from '../../components/navigation/web/Navbar'
import EmployeeTable from '../../components/table/EmployeeTable'

const Component = () => {
    return (
        <>
            <EmployeeTable />
        </>
    )
}

const Employees = () => {
    return (
        <>
            <Navbar 
                view={{
                    title: 'Employees',
                    component: <Component />
                }}
                right={null}
            />
        </>
    )
}

export { Employees } 