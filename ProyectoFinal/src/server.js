const express = require('express')
const routerProductos = require('./routers/ProdRouter.js')
const routerCarrito = require('./routers/CarritoRouter')

const app = express()

app.use(express.urlencoded({extend: true}))
app.use(express.static('public'))

app.use('/api/productos', routerProductos)
app.use('/api/carritos', routerCarrito)

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})

server.on("error", error => console.log(`Error en el servidor ${error}`))
