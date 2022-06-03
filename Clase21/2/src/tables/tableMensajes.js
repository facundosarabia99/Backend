import knex from "knex";

const dbConfigSQLite = {
    client: 'sqlite',
    connection: {
        filename: '../DB/ecommerce.sqlite'
    },
    useNullAsDefault: true
}

const knexSQLite = knex(dbConfigSQLite);

knexSQLite.schema.createTable('mensajes', (table) => {
    table.string('email');
                table.string('text');
                table.string('date')
    })
        .then(()=>{
            console.log('tabla "mensajes" creada!');
        })
        .catch ((error) => {
            console.log(error)
        })
        

