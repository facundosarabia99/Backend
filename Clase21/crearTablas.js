import createknex from 'knex'

const dbConfig = {
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'mysqlpassword',
    database: 'CoderHouse'

}

//const dbConfigString = `mysql://<user>:<password>@<host>:<port>/<database>`

const knexConfig = {
    client:'mysql2',
    connection: dbConfig
}

const knex = createknex(knexConfig);

knex.schema.hasTable('personas')
  .then(exists => {
      if(!exists) {
        knex.schema.createTable('personas', tabla => {
            tabla.increments('id'),
                tabla.string('nombre'),
                tabla.integer('edad')
        })
        .then(() => {
        console.log('tabla personas creada!')  
        })
  } else {
    console.log('tabla personas ya existe no se realizaran cambios')
  }
})  
.finally(() => {
    knex.destroy()
})