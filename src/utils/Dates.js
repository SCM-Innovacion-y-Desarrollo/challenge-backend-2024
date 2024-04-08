import moment from "moment"

/*
Función que se encarga de obtener el primer y último día del mes actual.
*/
const getMonth = () => {
    let date  = new Date()
    let year  = date.getFullYear()
    let month = date.getMonth()

    let start = moment(new Date(year, month, 1))
    let end;

    if(month + 1 > 11){
        end = moment(new Date(year + 1, 0, 1)).subtract(1, 'days')
    }else{
        end = moment(new Date(year, month + 1, 1)).subtract(1, 'days')
    }

    return [
        start.toDate(),
        end.toDate()
    ]
}

export {
    getMonth
}