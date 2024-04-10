import { Box, Button, Chip, FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import SearchIcon from '@mui/icons-material/Search';
import { useContext, useEffect, useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { useSearchParams } from "react-router-dom";
import moment from "moment";
import { gettingEmployees } from "../../utils/Employees";
import { gettingTimecard } from "../../utils/Timecard";
import { Context } from "./Context";

const locale = 'en-us'

const ToolBar = () => {
    const {
        employees, 
        loading, 
        setRows
    } = useContext(Context);

    const [searchParams, setSearchParams] = useSearchParams();
    
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [employee, setEmployee] = useState('1');
    const [loading1, setLoading1] = useState(false);

    useEffect(() => {
        if(searchParams.get('start') && searchParams.get('end') && searchParams.get('employee_id')){
            setStart(searchParams.get('start'))
            setEnd(searchParams.get('end'))
            setEmployee(searchParams.get('employee_id'))

            gettingTimecard(setLoading1, searchParams.get('start'), searchParams.get('end'), searchParams.get('employee_id'))
            .then((response) => {
                setRows(response.data)
            })
            .catch((error) => { console.error(error.message) })
            .finally(() => { setLoading1(false) })
        }
    }, [searchParams, setRows])


    return (
        <>
            <Box sx={{ borderBottom: (theme) => theme.palette.mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.24)' : '1px solid rgba(0, 0, 0, 0.24)',}}>
                <Grid container spacing={2}>
                    <Grid item xs={5} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px'}}>
                        <Grid item xs={6}>
                            <FormControl fullWidth sx={{pl: 2}}>
                                <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale={locale}>
                                    <DatePicker 
                                        label="Start"
                                        fullWidth
                                        value={moment(start, 'YYYY-MM-DD')}
                                        shouldDisableDate={(date) => {
                                            return date.isAfter(moment(end, 'YYYY-MM-DD'))
                                        }}
                                        onChange={(date) => {
                                            setStart(date.format('YYYY-MM-DD'))
                                            setSearchParams((params) => ({
                                                ...params,
                                                'start': date.format('YYYY-MM-DD'),
                                                'end': end
                                            }))
                                        }}
                                        disabled={loading || loading1}
                                    /> 
                                </LocalizationProvider>
                            </FormControl>
                        </Grid>

                        <Grid item xs={6}>
                            <FormControl fullWidth sx={{pl: 2}}>
                                <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale={locale}>
                                    <DatePicker 
                                        label="End"
                                        fullWidth
                                        value={moment(end, 'YYYY-MM-DD')}
                                        shouldDisableDate={(date) => {
                                            return date.isBefore(moment(start, 'YYYY-MM-DD'))
                                        }}
                                        onChange={(date) => {
                                            setEnd(date.format('YYYY-MM-DD'))
                                            setSearchParams((params) => ({
                                                ...params,
                                                'start': start,
                                                'end': date.format('YYYY-MM-DD')
                                            }))
                                        }}
                                        disabled={loading || loading1}
                                    /> 
                                </LocalizationProvider>
                            </FormControl>
                        </Grid>
                    </Grid>

                    <Grid item xs={3} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px'}}>
                        <FormControl fullWidth sx={{ pr: 2}}>
                            <InputLabel id="l-employee">Employee</InputLabel>

                            <Select
                                labelId="l-employee"
                                id="employee"
                                value={employee}
                                label="Employee"
                                onChange={(event) => {
                                    setEmployee(event.target.value)
                                    setSearchParams((params) => ({
                                        ...params,
                                        'start': start,
                                        'end': end,
                                        'employee_id': event.target.value
                                    }))
                                }}
                                disabled={loading || loading1}
                            >
                                {employees.map((employee, key) => 
                                    <MenuItem key={key} value={`${employee.id}`}>
                                        { employee.fullname }
                                    </MenuItem>
                                )}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={2} />

                    <Grid item xs={2} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px', pr: 2}}>
                        <Button 
                            fullWidth 
                            variant="contained" 
                            endIcon={<SearchIcon />}
                            disableElevation
                            sx={{
                                height: '56px',
                            }}
                            onClick={() => {
                                gettingTimecard(setLoading1, start, end, employee)
                                .then((response) => {
                                    setRows(response.data)
                                })
                                .catch((error) => { console.error(error.message) })
                                .finally(() => { setLoading1(false) })
                            }}
                            disabled={loading || loading1}
                        >
                            Search
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

const TimecardTable = () => {
    const columns = [
        { field: 'date', headerName: 'Date', flex: 1 },
        { field: 'shifts', headerName: 'Shift', flex: 1 },
        { 
            field: 'punch_in', 
            headerName: 'Punch In', 
            flex: 1,
            renderCell: (params) => params.value.map((punch, key) => <Chip color="success" sx={{ m: 0.5}} key={key} variant="filled" label={punch}/> )
        },
        { 
            field: 'punch_out', 
            headerName: 'Punch Out',
            flex: 1,
            renderCell: (params) => params.value.map((punch, key) => <Chip color="error" sx={{ m: 0.5}} key={key} variant="filled" label={punch}/> )
        },
    ]

    const [rows, setRows] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        gettingEmployees(setLoading)
        .then((response) => {
            setEmployees(response.data)
        })
        .catch((error) => { console.error(error.message) })
        .finally(() => { setLoading(false)})
    }, [])

    return (
        <>
            <Context.Provider
                value={{
                    rows, setRows,
                    employees, setEmployees,
                    loading, setLoading
                }}
            >
                <DataGrid
                    sx={{ height: '85.8vh', width: '100%' }}
                    rows={rows}
                    columns={columns}
                    loading={false}
                    slots={{
                        toolbar: ToolBar
                    }}
                    //onRowSelectionModelChange={(data) => setSelected(data[0])}
                />
            </Context.Provider>
        </>
    );
}

export default TimecardTable;