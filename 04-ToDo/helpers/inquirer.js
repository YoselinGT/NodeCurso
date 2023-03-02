import inquirer from 'inquirer';
import colors from 'colors';

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: 'Seleccione una opción',
        choices: [
            {
                value: '1',
                name: `${'1.'.green} Crear tarea`
            },
            {
                value: '2',
                name: `${'2.'.green}  Listar tareas`
            },
            {
                value: '3',
                name: `${'3.'.green}  Listar tareas completadas`
            },
            {
                value: '4',
                name: `${'4.'.green}  Listar tareas pendientes`
            },
            {
                value: '5',
                name: `${'5.'.green}  Completar tarea(s)`
            },
            {
                value: '6',
                name: `${'6.'.green}  Eliminar tarea(s)`
            },
            {
                value: '0',
                name: `${'0.'.green}  Salir`
            }

        ]
    }
];

const pausa = [
    {
        type: 'input',
        name: 'opcion',
        message: `\nPresione ${'ENTER'.green} para continuar\n`,
    }
];

const inquirerMenu = async () => {
    console.clear();
    console.log("===============================".green)
    console.log("==== Seleccione una opcion ====".green)
    console.log("===============================\n".green)

    const {opcion} = await inquirer.prompt(preguntas);

    return opcion;
}

const inquirePause = async () => {

    const {input} = await inquirer.prompt(pausa)

    return input;
}

const inquireQuestion = async (message) => {
    const question = [
        {
            type:'input',
            name: 'desc',
            message,
            validate(value){
                if(value.length === 0){
                    return 'Por favor ingrese un valor';
                }
                return true
            }
        }
    ]

    const {desc} = await inquirer.prompt(question)

    return desc;

}

const listadoTareasBorrar = async ( tareas = []) => {

    const choices = tareas.map((tarea,i) => {

        const idx = `${i+1}.`.green;

        return {
            value:tarea.id,
            name: `${idx} ${tarea.desc}`
        }
        }
    );

    choices.unshift({
        value:'0',
        name: '0. '.green +' Cancelar'
    })

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ];

    const {id} = await inquirer.prompt(preguntas)
    return id
}

const confirmar = async (message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]

    const {ok} = await inquirer.prompt(question)

    return ok;
}

const mostrarListadoCheckList = async ( tareas = []) => {

    const choices = tareas.map((tarea,i) => {

            const idx = `${i+1}.`;

            return {
                value:tarea.id,
                name: `${idx} ${tarea.desc}`,
                checked: (tarea.completado) ? true : false
            }
        }
    );

    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione',
            choices
        }
    ];

    const {ids} = await inquirer.prompt(pregunta);

    return ids;
}

export {
    inquirerMenu,
    inquirePause,
    inquireQuestion,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoCheckList
}