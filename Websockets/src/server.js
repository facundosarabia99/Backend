const express = require('express')
const fs = require('fs')

const { Server: HttpServer } = require('http')
const { Server: IOServer } =require ('socket.io')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

app.use(express.static('public'))

const productos = []
const mensajes = []

//configuracion para socket
io.on('conection', (socket) => {
    //parte productos
    socket.emit('productos', productos)

    socket.on('update', producto => {
        productos.push(producto)
        io.sockets.emit('productos', productos)
    })
    
    //parte mensajes
    socket.emit('mensajesActualizados', mensajes)

    socket.on('nuevoMensaje'), async mensaje => {
        mensaje.fecha = new Date().toLocaleDateString()
        mensajes.push(mensaje)
        socket.emit('mensajesActualizados', mensajes)
    }
    
})



app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

//iniciacion de servidor

const PORT = 8080
const conexionServidor = httpServer.listen(PORT, () => {
    console.log(`Servidor esuchando el puerto ${PORT}`)
})
conexionServidor.on('error', error => console.log(error))