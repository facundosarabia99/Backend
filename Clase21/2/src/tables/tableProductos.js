import knex from 'knex';

const dbConfigMariaDB = {
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'dbpassword',
    database: 'myfisrtdb'
}

const knexConfig = require('knex')({
    client: 'mysql2',
    connection: dbConfigMariaDB
})

const knexMariaDB = knex(knexConfig);

knexMariaDB.shema.createTable('productos', (table) =>{
    table.incrementals('id'),
    table.string('title'),
    table.integer('price'),
    table.string('picture')
})   

    .then(()=>{
        console.log('tabla "productos" creada!');
    })
    .catch ((error) => {
        console.log(error)
    })
