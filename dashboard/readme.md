## Instalación de las dependencias del proyecto.

Para instalar las dependencias del cliente tienes que estar a la altura del archivo package.json como se muestra a continuación 

```
Directorio Raíz 
|__ public
|__ src
|__ package.json
```

puedes instalar los paquetes con tu gestor favorito, para este caso se darán ejemplos para YARN y NPM.

```
npm run install
```

Si utilizas el destor de paquetes yarn puedes utilizar

```
yarn
```

o

```
yarn install
```

## Inicialización del cliente (Dashboard).

Una vez que se terminen de descargar las dependencias ejecuta el siguiente comando

```
npm run start
```

o

```
yarn start
```

Esto te abrirá una ventana en el navegador (localhost:3000) desde donde se ejecutarán todas las acciones.

## Funciones y endpoints.

Ya que el challenge tiene como finalidad evaluar el desarrollo de las API's que crearas hemos estructurado este proyecto y realizado funciones con MOCK DATA que emulan el comportamiento esperado de los diferentes endpoints.

```
Directorio Raíz 
|__ public
|__ src
|   |__ utils
|       |__ Dates.js
|       |__ DeviceGroup.js
|       |__ Devices.js
|       |__ Employees.js
|       |__ Login.js
|       |__ Timecard.js
```

Modifica las funciones en los archivos ubicados en la carpeta utils
intentando mantener la estructura de las respuestas de la api a la MOCK-DATA si quieres cambiar la estructura de los endpoint tendrás que modificar el cliente.

```
// Simulación de inicio de sesión

const logging = async (event, setLoading, usern, password, redirect ) => {
	event.preventDefault()
    
	setLoading(true)

    return new Promise((resolve) => {
        setTimeout(() => {
            sessionStorage.setItem('authenticated', true)
            resolve({ data: {} });
        }, 1000);
    })
}
```

```
// Realizar la peticion HTTP correspondiente para hacer inicio de sesion

const logging = async (event, setLoading, user, password, redirect ) => {
	event.preventDefault()
    
	setLoading(true)

    const body = {
        user,
        password,
    }

    return await axios.post('url/login', body)
    .then((response) => {
        // Manejar el inicio de sesión y almacenar los datos requeridos en el endpoint
        sessionStorage.setItem('authenticated', true)
        // redireccionar

    })
    .catch((error) => { 
        // Manejar el error
        console.error(error.message)
    })
    .finally(() => {
        setLoading(false)
    })
}
```