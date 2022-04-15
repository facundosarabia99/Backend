const express = require('express')
const routerProductos = require('./ProductosRouter')

const app = express()
//app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/productos', ProductosRouter)
app.use(express.static('public'))

const PORT = 8080
const server = app.listen(PORT, () =>{
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en el servidor ${error}`))