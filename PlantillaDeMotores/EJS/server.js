const path = require('path')
const express = require('express')
const routerProductos = require('./routes/routerProductos')

const app = express()


//const viewsPath = path.join(__dirname, '../src/views')

app.set('views', './views')
app.set('view engine', 'ejs')

//app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', routerProductos)
app.use(express.static('public'))

const PORT = 8080
const server = app.listen(PORT, () =>{
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en el servidor ${error}`))