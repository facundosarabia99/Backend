import knex from 'knex'
import express, { json } from 'express'
import productosRouter from './src/router/productos.js'

const app = express()
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')



app.use(json())

app.use('/api/productos-test', productosRouter)


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

const dbConfigSQLite = {
    client: 'sqlite',
    connection: {
        filename: '../DB/ecommerce.sqlite'
    },
    useNullAsDefault: true
}

const knexSQLite = knex(dbConfigSQLite);



const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const mensajes = []
const productos = []

io.on('connection', async IOServer => {
    //productos
    knexMariaDB
        .select()
        .table('productos')
        .then((productos) => {
            io.socket.emit('productos', productos)
    });
    knexSQLite
        .select()
        .table('mensajes')
        .then((mensajes) =>{
            socket.emit('mensajesActualizados', mensajes)
        });

    socket.on('update', async (producto) => {
        await knexMariaDB('productos').insert(producto)
        productos.push(producto)
        io.sockets.emit('productos', productos)
    })

    //mensajes
    socket.on('nuevoMensaje', async (mensaje) => {
        await knexSqlite('mensajes').insert(mensaje)
        knexSQLite.select().table('mensajes').then(mensajes =>{
            mensaje.fecha = new Date().toLocaleString()
            mensajes.push(mensaje)
            io.sockets.emit('mensajesActualizados', mensajes)

        })
    })
})


const server = httpServer.listen(8080, () => {
    console.log(`servidor conectado en puerto ${server.address().port}`)
})