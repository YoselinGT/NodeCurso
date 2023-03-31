import {Sequelize} from 'sequelize'


const db = new Sequelize('NodeCurso','root','root',{
    host: 'localhost',
    dialect: 'mariadb',
    //logging: false
});

export default db;