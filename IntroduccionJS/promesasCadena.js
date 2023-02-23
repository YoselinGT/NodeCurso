const empleados = [
    {
        id: 1,
        nombre:'Yoselin'
    },
    {
        id: 2,
        nombre:'Linda'
    },
    {
        id: 3,
        nombre:'Karne'
    }
];

const salarios = [
    {
        id: 1,
        salario:1000
    },
    {
        id: 2,
        salario:5000
    }
]


const getSalario = (id,callback) =>{
    return new Promise((resolve,reject)=> {
        const salario = salarios.find(e => e.id === id)?.salario
        salario
            ? resolve(salario)
            : reject(`No existe salario con id ${id}`)
    })
}

const getEmpleado = (id) => {
    return new Promise((resolve,reject)=> {
        const empleado = empleados.find(e => e.id === id)?.nombre
        empleado
            ? resolve(empleado)
            : reject(`No existe empleado con id ${id}`)
    })
}


const id = 3;
let nombre;

getEmpleado(id)
    .then(empleado => {
        nombre = empleado
        return getSalario(id)
    })
    .then( salario => console.log(`El empleado ${nombre} tiene salario ${salario}`))
    .catch(err => console.log(err))