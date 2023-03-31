import {Sequelize} from 'sequelize'


const db = new Sequelize('Token','root','root',{
    host: 'localhost',
    dialect: 'mariadb',
    //logging: false
});

export default db;


//owner Usuario @relation(fields: [iownerid], references: [iusuarioid])

//rel_usuariorganizacionrole rel_usuariorganizacionrole[]


//TODO agregar relacion de usuario y cat roles
