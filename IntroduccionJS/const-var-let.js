//Var crea la variable de ambito global
var nombre = "Yoselin"
//Las constante no pueden cambiar su valor
const apellido = "Galvan"
console.log(nombre,apellido)

//let crea la variable en un scope
if(true){
    let nombre = "Yomara"
    const apellido = "Torres"
    console.log(nombre,apellido)
}

console.log(nombre,apellido)

