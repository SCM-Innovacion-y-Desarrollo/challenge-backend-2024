import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import React, { useContext } from 'react'
import { GlobalContext } from '../GlobalContext'
import { SignIn } from '../pages/common/SignIn'
import { Employees } from '../pages/web/Employees'
import { Employees as EmployeesMobile } from '../pages/mobile/Employees'
import { Devices } from '../pages/web/Devices'
import { DevicesGroups } from '../pages/web/DevicesGroups'

const WebPaths = () => {
    const { authenticated } = useContext(GlobalContext)

    return (
        <>
            <Router>
                <Routes>
                    <Route
                        path='/'
                        element={ authenticated ? <Navigate to={'/employees'}/> : <Navigate to={'/signin'}/> }
                        exact
                    />

                    <Route
                        path='/signin'
                        element={ authenticated ? <Navigate to={'/'}/> : <SignIn /> }
                        exact
                    />

                    <Route
                        path='/employees'
                        element={ authenticated ? <Employees /> : <Navigate to={'/signin'}/> }
                        exact
                    />

                    <Route
                        path='/devices'
                        element={ authenticated ? <Devices /> : <Navigate to={'/signin'}/> }
                        exact
                    />

                    <Route
                        path='/device_groups'
                        element={ authenticated ? <DevicesGroups /> : <Navigate to={'/signin'}/> }
                        exact
                    />

                    <Route
                        path='/timecard'
                        element={ authenticated ? <Devices /> : <Navigate to={'/signin'}/> }
                        exact
                    />

                    <Route path='*' element={<>404 page not found</>}/>
                </Routes>
            </Router>
        </>
    )
}
const MobilePaths = () => {
    const { authenticated } = useContext(GlobalContext)

    return (
        <>
            <Router>
                <Routes>
                    <Route
                        path='/'
                        element={ authenticated ? <Navigate to={'/employees'}/> : <Navigate to={'/signin'}/> }
                        exact
                    />

                    <Route
                        path='/signin'
                        element={ authenticated ? <Navigate to={'/'}/> : <SignIn /> }
                        exact
                    />

                    <Route
                        path='/employees'
                        element={ authenticated ? <EmployeesMobile /> : <Navigate to={'/signin'}/> }
                        exact
                    />

                    <Route path='*' element={<>404 page not found</>}/>
                </Routes>
            </Router>
        </>
    )
}


export {
    WebPaths,
    MobilePaths
}