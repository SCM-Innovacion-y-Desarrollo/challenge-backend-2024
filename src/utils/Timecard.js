const gettingTimecard = async (setLoading, start, end, employee_id) => {
    setLoading(true)

    // reemplazar por una llamada a una API para obtener la tarjeta de tiempo
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ 
                data: [
                    {
                        id: 1,
                        date: '2024-03-01',
                        shifts: '09:00 - 18:00',
                        punch_in: [ '09:31' ],
                        punch_out: ['13:00', '14:00', '18:00'],
                    },
                    {
                        id: 2,
                        date: '2024-03-02',
                        shifts: '',
                        punch_in: [],
                        punch_out: [],
                    },
                    {
                        id: 3,
                        date: '2024-03-03',
                        shifts: '',
                        punch_in: [],
                        punch_out: [],
                    },
                    {
                        id: 4,
                        date: '2024-03-04',
                        shifts: '22:00 - 07:00',
                        punch_in: [],
                        punch_out: [],
                    },
                    {
                        id: 5,
                        date: '2024-03-05',
                        shifts: '',
                        punch_in: [],
                        punch_out: [],
                    },
                    {
                        id: 6,
                        date: '2024-03-06',
                        shifts: '',
                        punch_in: [],
                        punch_out: [],
                    },
                    {
                        id: 7,
                        date: '2024-03-07',
                        shifts: '',
                        punch_in: [],
                        punch_out: [],
                    },
                    {
                        id: 8,
                        date: '2024-03-08',
                        shifts: '',
                        punch_in: [],
                        punch_out: [],
                    },
                    {
                        id: 9,
                        date: '2024-03-09',
                        shifts: '',
                        punch_in: [],
                        punch_out: [],
                    },
                    {
                        id: 10,
                        date: '2024-03-10',
                        shifts: '',
                        punch_in: [],
                        punch_out: [],
                    },
                    {
                        id: 11,
                        date: '2024-03-11',
                        shifts: '',
                        punch_in: [],
                        punch_out: [],
                    },
                    {
                        id: 12,
                        date: '2024-03-12',
                        shifts: '',
                        punch_in: [],
                        punch_out: [],
                    },
                    {
                        id: 13,
                        date: '2024-03-13',
                        shifts: '',
                        punch_in: [],
                        punch_out: [],
                    },
                    {
                        id: 14,
                        date: '2024-03-14',
                        shifts: '',
                        punch_in: [],
                        punch_out: [],
                    },
                    {
                        id: 15,
                        date: '2024-03-15',
                        shifts: '',
                        punch_in: [],
                        punch_out: [],
                    },
                ]
            });
        }, 1000);
    })
}

export {
    gettingTimecard
}