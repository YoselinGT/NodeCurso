const deadpool = {
    nombre: 'Wade',
    apellido: 'Winston',
    poder: 'Regeneracion',
    getnombre() {
        return `${this.nombre} ${this.apellido}`;
    }
}


function imprimeHero({nombre,apellido,poder}){

    console.log(nombre, apellido, poder)
}

//imprimeHero(deadpool)

const heroes = ['Deadpool','Superman','Batman']
/*const h1 = heroes[0]
const h2 = heroes[1]
const h3 = heroes[2]

console.log(h1,h2,h3)*/

//const [h1,h2,h3] = heroes;
//console.log(h1,h2,h3)
const [,,h3] = heroes;

console.log(h3)