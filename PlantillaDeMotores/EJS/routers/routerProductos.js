const {Router} = require('express')

const routerProductos = Router()
const productos = []

routerProductos.get('/', (req, res) => {
    res.render('index', {productos})
})

routerProductos.get('/productos', (req, res) => {
    res.render('historial', {productos})
})

routerProductos.post('/productos', (req, res) => {
    if (!productos.length) {
        productos.id = 1
    } else {
        productos.id = productos.length + 1
    } 
    productos.push(req.body)
    console.log(`El id de este producto es ${productos.id}`)
    res.redirect('/')
})




module.exports = routerProductos;