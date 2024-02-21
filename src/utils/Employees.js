const gettingEmployees = (setLoading) => {
    // reemplazar por una llamada a una API para obtener los empleados
    setLoading(true)

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ 
                data: [
                    {
                        id: 1,
                        fullname: 'John Doe',
                        email: 'john.doe@mailinator.com',
                        dni: '12345678-9',
                        enrollments: {
                            face: true,
                            pin: true,
                        },
                        device_group: 'Group 1'
                    },
                    {
                        id: 2,
                        fullname: 'Richard Roe',
                        email: 'richard.roe@mailinator.com',
                        dni: '98765432-1',
                        enrollments: {
                            face: true,
                            pin: false,
                        },
                        device_group: 'Group 2'
                    },
                    {
                        id: 3,
                        fullname: 'Gustavo Gómez',
                        email: 'gustavo.gomez@mailinator.com',
                        dni: '24681012-3',
                        enrollments: {
                            face: false,
                            pin: true,
                        },
                        device_group: 'Group 3'
                    },
                    {
                        id: 4,
                        fullname: 'Ana María',
                        email: 'ana.maria@mailinator.com',
                        dni: '13579135-7',
                        enrollments: {
                            face: false,
                            pin: false,
                        },
                        device_group: 'Group 4'
                    },
                ]
            });
        }, 1000);
    })
}

const gettingEmployeeByID = (setLoading, id) => {
    // reemplazar por una llamada a una API para obtener del empleado mediante un ID
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ 
                data: { 
                    fullname: 'Nicolás Andrés Rivera Villalobos',
                    email: 'nicolas.rivera@scmlatam.com',
                    dni: '12345678-9',
                }  
            });
        }, 1000);
    })
}

const AddingEmployeeByID = (setLoading, fullname, dni, email) => {
    setLoading(true)
    // reemplazar por una llamada a una API para editar un empleado
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ 
                data: {
                    fullname,
                    email,
                    dni,
                }
            });
        }, 1000);
    })

}

const EditingEmployeeByID = (setLoading, id, fullname, dni, email) => {
    // reemplazar por una llamada a una API para editar un empleado
    setLoading(true)

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ 
                data: {
                    fullname,
                    email,
                    dni,
                }
            });
        }, 1000);
    })

}

const DeletingEmployeeByID = (setLoading, id) => {
    // reemplazar por una llamada a una API para eliminar un empleado
    setLoading(true)

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ 
                data: {}
            });
        }, 1000);
    })
}

export { 
    gettingEmployees,
    gettingEmployeeByID,
    AddingEmployeeByID,
    EditingEmployeeByID,
    DeletingEmployeeByID
}