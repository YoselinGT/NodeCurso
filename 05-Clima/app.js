import dotenv from 'dotenv'
import {inquireQuestion, inquirerMenu,listarLugares} from "./helpers/inquirer.js";
import {Busquedas} from "./models/busquedas.js";
dotenv.config()


const main = async () => {
    let opt;

    const busqueda = new Busquedas();


    do{
        opt = await inquirerMenu();

        switch (opt){
            case 1:
                //busqueda.Ciudad();
                const lugar = await inquireQuestion('Ciudad: ')

                //Buscar los lugares
                const lugares = await busqueda.Ciudad(lugar);

                //Selecionar el lugar
                const id = await  listarLugares(lugares);
                if(id === '0') continue;

                const lugarSel = lugares.find(l => l.id === id);

                //Guarda en DB
                busqueda.agregarHistorial(lugarSel.nombre);

                //Clima
                const clima = await busqueda.climaLugar(lugarSel.lat,lugarSel.lng);

                console.clear();
                console.log('\n Información de la ciudad\n'.green);
                console.log('Ciudad: ',lugarSel.nombre);
                console.log('Latitud: ', lugarSel.lat);
                console.log('Longitud: ', lugarSel.lng);
                console.log('Temperatura: ', clima.temp);
                console.log('Minima: ', clima.min);
                console.log('Maxima: ', clima.max);
                console.log('El clima de hoy: ', clima.desc);

                break;
            case 2:
                busqueda.historialCapitalizado.forEach((lugar,i) => {
                    const idx = `${i+1}`.green;
                    console.log(`${idx} ${lugar}`)
                });
                break;

        }


    } while ( opt !== 0);



}

main()