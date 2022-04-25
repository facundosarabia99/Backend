const express = require('express')
const exphbs = require('express-handlebars')

const app = express()


const handlebarsConfig = {defaultLayout: 'default.handlebars'}

app.engine('handlebars', exphbs.engine(handlebarsConfig))

app.set('view engine', 'handlebars')
app.set('views', './views')

app.use(express.urlencoded({ extended: true}))

const productos = []

app.get('/', (req,res) => {
    res.redirect('/cargaProductos')
})

app.get('/vistaProductos', (req, res) => {
    res.render('formularioProductos')
})

// define que es api rest
app.post('api/productos', (req, res) => {
    const prod = req.body
    productos.push(prod)
    console.log(productos)
    res.redirect('/')
})

app.get('/vistaproductos', (req, res) => {
    const hayProductos =productos.length > 0 
    res.render('vistaProductos', { hayProductos, productos })
})

const PORT = 8080
const server = app.listen(PORT, () =>{
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en el servidor ${error}`))