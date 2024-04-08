const gettingDevices = async (setLoading) => {
    setLoading(true)

    // reemplazar por una llamada a una API para obtener los dispositivos
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ 
                data: [
                    {
                        id: 1,
                        name: 'Sigma Lite+',
                        location: 'Oficina Santiago Chile',
                        timezone: 'America/Santiago',
                        device_group: 'Piso 12 Sector Desarrollo',
                        punch_type: {
                            pin: false,
                            face: false
                        }
                    },
                    {
                        id: 2,
                        name: 'Sigma Lite',
                        location: 'Bodega España',
                        timezone: 'Europe/Madrid',
                        device_group: 'Piso -1 Sector Almacén',
                        punch_type: {
                            pin: true,
                            face: false
                        },
                    },
                    {
                        id: 3,
                        name: 'VisionPass',
                        location: 'Linea de producción 1',
                        timezone: 'Asia/Shanghai',
                        device_group: 'Guardería 1B',
                        punch_type: {
                            pin: false,
                            face: true
                        },
                    },
                    {
                        id: 4,
                        name: 'VisionPass SP',
                        location: 'Linea de producción 2',
                        timezone: 'Asia/Seoul',
                        device_group: 'Guardería 1A',
                        punch_type: {
                            pin: true,
                            face: true
                        },
                    },
                ]
            });
        }, 1000);
    })
}

const gettingDeviceById = async (setLoading, id) => {
    setLoading(true)

    // reemplazar por una llamada a una API para obtener un dispositivo por su id
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ 
                data: {
                    id,
                    name: 'Morpho Sigma Lite+',
                    location: 'Oficina Santiago Chile',
                    timezone: 'America/Santiago',
                    device_group: 1,
                    pin: true,
                    face: true,
                }
            });
        }, 1000);
    })
}

const gettingDeviceGroups = async (setLoading) => {
    setLoading(true)

    // reemplazar por una llamada a una API para obtener los grupos de dispositivos
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ 
                data: [
                    {
                        id: 1,
                        name: 'Piso 1 Sector Ensambles',
                    },
                    {
                        id: 2,
                        name: 'Piso 1 Sector Despachos',
                    },
                    {
                        id: 3,
                        name: 'Piso 2 Sector ventas',
                    },
                    {
                        id: 4,
                        name: 'Piso -1 Sector Almacén',
                    },
                ]
            });
        }, 1000);
    })
}

const addingDevice = async (setLoading, name, location, timezone, device_group, pin, face) => {
    setLoading(true)

    // reemplazar por una llamada a una API para agregar un dispositivo
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ 
                data: {
                    name,
                    location,
                    timezone,
                    device_group,
                    pin,
                    face
                }
            });
        }, 1000);
    })
}

const edittingDevice = async (setLoading, id, name, location, timezone, device_group, pin, face) => {
    setLoading(true)

    // reemplazar por una llamada a una API para editar un dispositivo
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ 
                data: {
                    id,
                    name,
                    location,
                    timezone,
                    device_group,
                    pin,
                    face
                }
            });
        }, 1000);
    })

}

const deletingDeviceById = async (setLoading, id) => {
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

const addingPunchWithPIN = async (setLoading, dni, pin) => {
    setLoading(true)

    // reemplazar por una llamada a una API para agregar un punch con PIN
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ 
                data: {
                    dni,
                    pin
                }
            });
        }, 1000);
    })
}

const addingPunchWithFace = async (setLoading, dni, image) => {
    setLoading(true)

    // reemplazar por una llamada a una API para agregar un punch con Face
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ 
                data: {
                    dni,
                    image
                }
            });
        }, 1000);
    })

}

export {
    gettingDevices,
    gettingDeviceGroups,
    addingDevice,
    edittingDevice,
    gettingDeviceById,
    deletingDeviceById,
    addingPunchWithPIN,
    addingPunchWithFace
}