const addingDeviceGroup = async (setLoading, name, description, devices, employees) => {
    setLoading(true)

    // reemplazar por una llamada a una API para agregar un dispositivo
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

export { addingDeviceGroup }