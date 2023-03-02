import * as fs from "fs";
import axios from 'axios';


class Busquedas {

    historial = [];
    dbPath = './db/database.json'

    constructor() {
        this.leerDB()
    }

    get paramsMapbox() {
        return {
            'access_token': 'pk.eyJ1IjoieW9tYXJhZ3QiLCJhIjoiY2xlbXgycjh0MHBobDN1czAwMDR5bzh0bSJ9.gos1tTO_E9KvRIkUoeXq_A',
            'language': 'es',
            'proximity': 'ip',
            'limit': 5
        };
    }


    get paramsWeatherMap() {
        return {
            'appid': process.env.OPENWEATHER_KEY,
            'units': 'metric',
            'lang': 'es'
        }
    }

    get historialCapitalizado() {
        return this.historial.map(lugar => {
            let palabras = lugar.split(' ');

            palabras = palabras.map( p => p[0].toUpperCase() +p.substring(1));
            return palabras.join(' ');
        });
    }

    async Ciudad(lugar = '') {

        try {

            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapbox
            });

            const resp = await instance.get();

            return resp.data.features.map(lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1]
            }))

        } catch (error) {
            return [];
        }
    }

    async climaLugar(lat, lon) {
        try {
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: {...this.paramsWeatherMap, lat, lon}
            });

            const resp = await instance.get();

            const {weather, main} = resp.data;

            return {
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            };
        } catch (error) {
            console.log(error)
        }
    }

    agregarHistorial(lugar = '') {

        this.historial.unshift(lugar.toLocaleLowerCase())

        this.historial = this.historial.splice(0,5);

        //Grabar en un archivo de texto
        this.guardarDB();

    }

    guardarDB() {

        const payload = {
            historial: this.historial
        }

        fs.writeFileSync(this.dbPath, JSON.stringify(payload));
    }

    leerDB() {

        if(!fs.existsSync(this.dbPath)) return;


        const info = fs.readFileSync(this.dbPath, {encoding: 'utf-8'});
        const data = JSON.parse(info);

        this.historial = data.historial;
    }
}

export {
    Busquedas
}