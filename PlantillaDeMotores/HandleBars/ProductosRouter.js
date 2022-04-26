const {Router} = require('express')

const routerProductos = Router()
const productos = []

routerProductos.get('/', (req, res) => {
    res.json(productos)
})

routerProductos.get('/:id', (req, res) =>{
    const id = parseInt(req.params.id)
    tempProducto = productos[id - 1]
    if(!tempProducto){
        tempProducto = {error: 'producto no encontrado'}
    }
    res.json(tempProducto)
})

routerProductos.post('/', (req, res) => {
    if (!productos.length) {
        productos.id = 1
    } else {
        productos.id = productos.length + 1
    } 
    productos.push(req.body)
    console.log(`El id de este producto es ${productos.id}`)
    res.json(productos)
})

routerProductos.put('/:id', (req, res) =>{
    const nuevoProducto = req.body
    const id = parseInt(req.params.id)
    productos[id - 1] = nuevoProducto
    res.json(productos[id - 1])
})

routerProductos.delete('/:id', (req, res) =>{
    const id = parseInt(req.params.id)
    const productoEliminado = productos.splice(id - 1, 1)
    res.json({eliminado: productoEliminado})
})


module.exports = routerProductos;