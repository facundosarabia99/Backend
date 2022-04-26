const path = require('path')
const express = require('express')
const routerProductos = require('./routes/routerProductos')

const app = express()

app.set('view engine', 'pug')
app.set('views', './views')

//app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', routerProductos)
app.use(express.static('public'))

const PORT = 8080
const server = app.listen(PORT, () =>{
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en el servidor ${error}`))