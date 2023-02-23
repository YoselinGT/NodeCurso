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

const id = 3;

const getSalario = (id,callback) =>{
    const salario = salarios.find(e => e.id === id)?.salario
    if(salario){
        callback(null,salario)
    } else {
        callback(`Salario con id ${id} no existe`);
    }
}

const getEmpleado = (id,callback) => {
    const empleado = empleados.find(e => e.id === id)?.nombre
    if(empleado){
        callback(null,empleado)
    } else {
        callback(`Empleado con id ${id} no existe`);
    }
}

getEmpleado(id,(err,empleado) => {
    if(err){
        return console.log(err)
    }
    getSalario(id,(err,salario)=>{
        if(err){
            return console.log(err)
        }
        console.log("El empleado:", empleado, " tiene un salario de ",salario)
    })
});

