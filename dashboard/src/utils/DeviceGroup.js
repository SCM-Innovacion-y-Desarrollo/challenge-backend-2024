const gettingDeviceGroups = (setLoading) => {
    // reemplazar por una llamada a una API para obtener los grupos de dispositivos
    setLoading(true)

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ 
                data: [
                    {
                        id: 1,
                        name: 'Google Santiago',
                        description: 'El molino 2130',
                        devices: 2,
                        employees: 1
                    },
                    {
                        id: 2,
                        name: 'Enbol S.A.',
                        description: 'Av. Cristo Redentor 1500',
                        devices: 3,
                        employees: 2
                    },
                    {
                        id: 3,
                        name: 'Coca Cola',
                        description: 'Av. Las Heras 1500',
                        devices: 1,
                        employees: 3
                    },
                    {
                        id: 4,
                        name: 'Tesla Store Santiago',
                        description: 'Av. Pdte. Kennedy 5413',
                        devices: 4,
                        employees: 4
                    },
                    {
                        id: 5,
                        name: 'Microsoft',
                        description: 'Av. vitacura 6844',
                        devices: 5,
                        employees: 2

                    }
                ]
            });
        }, 1000);
    })
}

const gettingDeviceGroupById = async (setLoading, id) => {
    setLoading(true)

    // reemplazar por una llamada a una API para obtener un grupo de dispositivo por su id
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ 
                data: {
                    id,
                    name: 'Google Santiago',
                    description: 'El molino 2130',
                    devices: [1],
                    employees: [2,4]
                }
            });
        }, 1000);
    })
}

const addingDeviceGroup = async (setLoading, name, description, devices, employees) => {
    setLoading(true)

    // reemplazar por una llamada a una API para agregar un grupo de dispositivos
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ 
                data: {
                    name,
                    description,
                    devices,
                    employees
                }
            });
        }, 1000);
    })
}

const deletingDeviceGruopById = async (setLoading, id) => {
    setLoading(true)

    // reemplazar por una llamada a una API para eliminar un dispositivo
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ 
                data: {}
            });
        }, 1000);
    })

}

export { 
    gettingDeviceGroups,
    addingDeviceGroup,
    gettingDeviceGroupById,
    deletingDeviceGruopById
}