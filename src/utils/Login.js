//import axios from "axios"

// Validar que el nombre de usuario sea alfanumérico y tenga una longitud de 4 a 32 caracteres.
const validateUsername = (username) => {
    const regex = /^[a-z0-9_-]{4,32}$/
    return regex.test(username)
}

/*
La contraseña debe contener al menos una letra minúscula.
La contraseña debe contener al menos una letra mayúscula.
La contraseña debe contener al menos un número.
La contraseña debe tener al menos 8 caracteres. 
*/
const validatePassword = (password) => {
	const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/
  	return regex.test(password)
}

const logging = async (event, setLoading, usern, password, redirect ) => {
	event.preventDefault()
    
	setLoading(true)
	
    // realizar la peticion HTTP correspondiente para hacer inicio de sesion
    /*
    return await axios.post('url', body)
    .then((response) => {})
    .catch((error) => {})
    .finally(() => {})
    */

    // Simulación de inicio de sesión
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ data: {} });
        }, 1000);
    })
}

export {
    validateUsername,
    validatePassword,
    logging,
}